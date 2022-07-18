import { formatDate } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { LoadingService } from 'src/app/services/loading.service';
import { ReportingService } from 'src/app/services/reporting.service';
declare var bootbox :any ;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit , AfterViewInit {
  @Input() ReportIDInput! :any;
  @Input() ReportURLInput! :any;
  
  @Output() getResponse = new EventEmitter;

   //breadcrumb
  [x:string]:any;
  Showtable :boolean =false;
  showSearch :boolean =false;
  optionsmulti : any = [] ;
  AllLookup: any = [] ;
  AllLookupMulti: any = [] ;

  AlloptionsInArray: any = [] ;

  Alloptions = new Map();
  AlloptionsMulti= new Map();
 
  loading$ = this.loader.loading$;
  checkLoader = false;

    //  moreComponents = [
  //     {namerr: 'WorkItemId' , code:'1'},
  //     {namerr: 'ProcessName', code:'2'},
  // ];

    // optionsmulti=[
    //   {name:"nameOpt1" , value:"op1"} , {name:"nameOpt2" , value:"op2"}
    // ];

   // Alloptionstest =["Version 53", "Version 54"]

  constructor(private reporting: ReportingService ,  public loader: LoadingService) { }

 

  ngOnInit(): void {
      // alert(this.ReportIDInput);
     // this.loader.show();
     this.ReportId = this.ReportIDInput;
     this.ReportURL = this.ReportURLInput;
     
    this.getReport(this.ReportId);
   // console.log(this.loading$);
  }

  ngAfterViewInit(): void {
  //  this.checkLoader = this.loader.show();
  }

  getReport(_ReportId:any) {
     this.checkLoader = this.loader.show();
    // alert(_ReportId);
      this.reporting.getReports(_ReportId).subscribe((Response1: any) => {
        console.log(Response1);
      this.MyReport = Response1.report;
      this.Myparams = Response1.params;
      this.objectSearch = this.Myparams;
      console.log("MyparamsReport");
      console.log(this.objectSearch);
      for(let i=0 ; i < this.objectSearch.length ; i++){
       // console.log(this.objectSearch[i]);
        if(this.objectSearch[i].is_LOOKUP ==  1){
          this.reporting.getLookups(this.objectSearch[i].lookup_ID).subscribe((Response: any) => {
            // console.log(Response);
            // alert(Response);
            if(Response.code == 1){
            this.MyLookups = Response.body;
            console.log("this.MyLookups");
            console.log(this.MyLookups);
            if(this.objectSearch[i].is_MULTI_SELECTION == 0 || this.objectSearch[i].is_MULTI_SELECTION == 1){
              this.Alloptions.set(this.objectSearch[i].param_ID, this.MyLookups);
            
               this.objectoptions = {
                "param_ID" : this.objectSearch[i].param_ID,
                "param_NAME" : this.objectSearch[i].param_NAME,
                "dep_PARAM_ID" : this.objectSearch[i].dep_PARAM_ID,
                "Alloptions" : this.Alloptions.get(this.objectSearch[i].param_ID)
               }
               this.AllLookup.push(this.objectoptions);
              console.log("AllLookup");
            }

      
           
            if(i == this.objectSearch.length -1 && Response.code == 1){
             // alert(Response);
              //setInterval
              setTimeout(() => {
                this.checkLoader = this.loader.hide();
                this.showSearch = true;
                this.onChange(null, this.objectSearch[i].param_ID , this.objectSearch[i].dep_PARAM_ID);
                console.log(this.AllLookup.length);

              }, 4000)
          
          }
        }else{ //Response.code !== 1
            bootbox.alert({
              title: "<span style='font-weight: 400; font-size: 16px; color:#a33'>"+" Error"+"</span>  </i>",
              message: "<span style='font-weight: 400; font-size: 16px; color:#a33'>"+Response.body+"</span>  </i>",
              callback: function(){ 
              }
          });
        }
      });


        }else{ 
          if( i == this.objectSearch.length - 1 ){
            //alert(this.objectSearch.length - 1 );
            setTimeout(() => {
              this.checkLoader = this.loader.hide();
              this.showSearch = true;
            }, 4000)
        }
        }
 
      
   
      
      }

      console.log("AllLookup");
      console.log(this.AllLookup);


      console.log("AllLookupMulti");
      console.log(this.AllLookupMulti);

  


    });

   
    
  }



 
  searchReport(_f:any ){
    this.Showtable = true;
    console.log(_f);
     // console.log(Object.keys(_f)); console.log(Object.values(_f));
     Object.keys(_f).forEach(key => {
      //  console.log("key: ", key); console.log("Value: ", _f[key]); console.log("length: ", _f[key].length); console.log("typeof: ", typeof(_f[key]));
      if(typeof(_f[key]) === 'object' && _f[key] !== null){
        if(_f[key].length !== undefined && _f[key].length > 0){
        this.AlloptionsInArray=[];
        for(let i=0 ; i < _f[key].length ; i++){
          // console.log(_f[key][i].ID);
          this.AlloptionsInArray.push(_f[key][i].ID);
        }
        _f[key]=[];
        _f[key] = this.AlloptionsInArray;
       
      }}
    } );
  
    console.log(_f);  
    this.loading= true;
    this.reporting.searchInstance(_f ,  this.ReportURL , this.ReportId).subscribe((Response: any) => {
      this.MydataReport = Response.body;

      console.log(Response);
      // this.Allcols = [
      //   { field: 'process_INSTANCE_ID', header: 'process_INSTANCE_ID' },
      //   { field: 'process_INSTANCE_NAME', header: 'process_INSTANCE_NAME' }
      // ];
      this.Allcols = Response.col.elements;
      this.loading= false;
      console.log(this.MydataReport);
      this.MydataReportExport = this.MydataReport
      console.log(this.Allcols);
      this.cols = this.Allcols;
      this._selectedColumns =  this.cols ;
    });

  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }


  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
      this.dataProcesses = document.getElementById('dtReport');
      //console.log(document.getElementById('dtmytasklist'));
      const worksheet = xlsx.utils.table_to_sheet(this.dataProcesses);
    // const worksheet = xlsx.utils.json_to_sheet(this.MydataReportExport);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Report");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    //npm install filesaver
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + formatDate(new Date(), "dd-MMM-YYYY hh:mm", 'en-US') + EXCEL_EXTENSION);
  }

  
  reset(_f:any){
    _f.resetForm({
    });
    this.searchReport(_f.value);
   // console.log(_f.value);
  }


  onChange = (_fLookup:any , param_ID_P:any , dept_paramID:any ) => {
    // alert(_fLookup);
    console.log(_fLookup);
    console.log(param_ID_P);
    console.log(dept_paramID);
    console.log(this.AllLookup);
    console.log(this.AllLookup.length);
      console.log(dept_paramID);
 // console.log(this.Alloptions.get(10))
  console.log(this.Alloptions.get(dept_paramID))
  // let Lookup_dept_paramID1 = this.AllLookup.filter((e: { param_ID: any; }) => e.param_ID == dept_paramID)
  // console.log(Lookup_dept_paramID1);
  // this.datafilter= Lookup_dept_paramID1[0].Alloptions;
  // console.log(this.datafilter);

  if(_fLookup == null){
    console.log("_fLookup==null")
    console.log(this.AllLookup);
    console.log(this.AllLookup.length);
    
    for(let i=0 ; i < this.AllLookup.length ; i++ ){
      console.log(this.AllLookup[i].dep_PARAM_ID );
      if(this.AllLookup[i].dep_PARAM_ID !== null){
      for(let ii=0 ; ii < this.AllLookup.length ; ii++){
        if(this.AllLookup[ii].param_ID == this.AllLookup[i].dep_PARAM_ID  ){
          this.AllLookup[ii].Alloptions = [] ;
          console.log(this.AllLookup[ii]);
        }
      }
      }
    }
    console.log(this.AllLookup);
  }
  else{

    if(dept_paramID !== null){
   this.datafilter=this.Alloptions.get(dept_paramID);
   let newArr = this.datafilter.filter((e: { DEPENDCODE: any; }) => e.DEPENDCODE == _fLookup)
   console.log(newArr);
  // this.testobj [1].Alloptions = newArr;
    // this.Alloptions.set(param_ID_P, newArr);
    // console.log(this.Alloptions.get(param_ID_P))
   // this.Alloptions.set(param_ID_P, newArr);


    for(let i=0 ; i < this.AllLookup.length ; i++){
      
      console.log(this.AllLookup[i].Alloptions);
      console.log(this.AllLookup[i].param_ID );
      console.log(param_ID_P);
    if(this.AllLookup[i].param_ID == dept_paramID ){
      this.AllLookup[i].Alloptions = newArr ;
      //console.log(this.AllLookup[i]);
    }
    }
    console.log(this.AllLookup);
    console.log(this.AllLookup.length);
    
  }
  }

  }

}


      //is_MULTI_SELECTION
      // if(this.objectSearch[i].is_MULTI_SELECTION == 1 ){
            //   this.AlloptionsMulti.set(this.objectSearch[i].param_ID, this.MyLookups);
            //    this.objectoptionsMulti = {
            //      "param_ID" : this.objectSearch[i].param_ID,
            //      "Alloptions" : this.AlloptionsMulti.get(this.objectSearch[i].param_ID)
            //    }
            //    this.AllLookupMulti.push(this.objectoptionsMulti);
            //   // console.log(this.AllLookupMulti);
            // }



// onChangeList= (_f:any) => {
//   console.log(_f);
//      let newArr = this.All_cash_req_number.filter((e: { cash_REQUEST_NUMBER: any; }) => e.cash_REQUEST_NUMBER == _f)
//    }



    // this.objectSearch = [
    //   {param_ID: 1, param_NAME: "param1", label_EN: "textReq", label_AR: "textReq", param_TYPE: "string", is_REQUIRED: 1} ,
    //   {param_ID: 2, param_NAME: "param2", label_EN: "textReq1", param_TYPE: "string", is_REQUIRED: 1} ,
    //   {param_ID: 3, param_NAME: "param3", label_EN: "textNoReq", param_TYPE: "string", is_REQUIRED: 0} ,
    //   {param_ID: 4, param_NAME: "param4", label_EN: "numberReq", param_TYPE: "number", is_REQUIRED: 1} ,
    //   {param_ID: 5, param_NAME: "param5", label_EN: "numberReq2", param_TYPE: "number", is_REQUIRED: 1} ,
    //   {param_ID: 6, param_NAME: "param6", label_EN: "numberNoReq", param_TYPE: "number", is_REQUIRED: 0} ,
    //   {param_ID: 7, param_NAME: "param7", label_EN: "DateReq", param_TYPE: "date", is_REQUIRED: 1} ,
    //   {param_ID: 8, param_NAME: "param8", label_EN: "DateNoReq", param_TYPE: "date", is_REQUIRED: 0} ,
    //   {param_ID: 9, param_NAME: "param9", label_EN: "DateTime", param_TYPE: "datetime", is_REQUIRED: 0} ,
    //   {param_ID: 10, param_NAME: "param10", label_EN: "CheckBox", param_TYPE: "boolean", is_REQUIRED: 0} ,
    //   {param_ID: 11, param_NAME: "param11", label_EN: "Lookup", param_TYPE: "lookup", is_REQUIRED: 0 , options:[
    //     {name:"nameOpt1" , value:"op1"} , {name:"nameOpt2" , value:"op2"}
    //   ]} ,

    //   {param_ID: 12, param_NAME: "param12", label_EN: "Lookup2", param_TYPE: "lookup", is_REQUIRED: 0 , options:[
    //     {name:"nameOpteeee1" , value:"opee1"} , {name:"nameOpeeet2" , value:"opggg2"}
    //   ]} ,

    //   {param_ID: 13, param_NAME: "param13", label_EN: "Multiselect", param_TYPE: "multiselect", is_REQUIRED: 0 , options:[
    //     {name:"multiselect1" , value:"multiselect10"} , {name:"multiselect1.1" , value:"opggg2"}
    //   ]} ,

    //   {param_ID: 14, param_NAME: "param14", label_EN: "Multiselect2", param_TYPE: "multiselect", is_REQUIRED: 1 , options:[
    //     {name:"1" , value:"1"} , {name:"2.2" , value:"2"}
    //   ]} 
    
    // ]


   