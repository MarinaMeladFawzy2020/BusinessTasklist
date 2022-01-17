import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'src/app/interfaces/treenode';
import { TestService } from 'src/app/services/test.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
[x:string]:any;
  files1!: TreeNode[];
    
  files2!: TreeNode[];
  parent:  Array<any> = [];  
  child:  Array<any> = [];  
  childs:  Array<any> = [];
  childArray:  Array<any> = [];
  Allobject:  Array<any> = []; 
  children:  Array<any> = []; 

  first = 0;
  totalRecords = 5;
  dataslider = [
    {"name":'"Director of general administration 1"'} ,
    {"name":'UTTS-Ticket-process 2'},
    {"name":'"Director of general 3 "'} ,
    {"name":'UTTS-Ticket-process 4'},
    {"name":'"Director of general 5 "'} 
  ]
  constructor(private nodeService: TestService) { }

  showMaximizableDialog() {
    this.displayMaximizable = true;
}


  onNodeSelect(event: { node: { label: any; }; }) {
   // this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
  }

  onPageChange(event: any) {
    this.first = event.first;
    console.log(event);
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
}


  ngOnInit() {

    this.dataorg = [{
      label: 'root',
      type: 'person',
      styleClass: 'p-person',
      expanded: false,
      data: {name:'Naming Process', 'version': 'Version 28'},
      children: [
          {
              label: 'children 1',
              type: 'person',
              styleClass: 'p-person',
              expanded: false,
              data: {name:'Naming Process', 'version': 'Version 28'},
              children:[{
                  label: 'children 1.1',
                  styleClass: 'department-cfo'
              },
              {
                  label: 'children 1.2',
                  styleClass: 'department-cfo'
              }],
          },
          {
              label: 'children 2',
              type: 'person',
              styleClass: 'p-person',
              expanded: false,
              data: {name:'Naming Process', 'version': 'Version 28'},
              children:[{
                  label: 'children 2.1',
                  styleClass: 'department-coo'
              }]
          },
          {
              label: 'children 3',
              type: 'person',
              styleClass: 'p-person',
              expanded: false,
              data: {name:'Naming Process', 'version': 'Version 28'},
              children:[{
                  label: 'children 3.1',
                  styleClass: 'department-cto',
                  expanded: false,
                  children:[{
                      label: 'children 3.1.1',
                      styleClass: 'department-cto'
                  },
                  {
                      label: 'children 3.1.2',
                      styleClass: 'department-cto'
                  }]
                
              }
              
             ]
          }
      ]
  }];



    


    this.nodeService.getFiles().subscribe(
      files =>{
       this.files2 = files 
       console.log(this.files2);
     });


  

  
  }

  
 

  getDataTree(){
    this.tree = [
        {
            "ROLE_ID": 4724,
            "ROLE_NAME": "Move Ticket From Draft to Resolution.jj",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 4764,
            "ROLE_NAME": "From Closure Queue to Resolution Queue",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 4766,
            "ROLE_NAME": "Move ticket from Freeze queue.",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 2622,
            "ROLE_NAME": "ReviewIssues",
            "DESCRIPTION": "Review The Issue",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 2954,
            "ROLE_NAME": "cvs",
            "DESCRIPTION": "ss",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 2602,
            "ROLE_NAME": "ISSUES",
            "DESCRIPTION": "ISSUES PROCESS ROLE",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 3024,
            "ROLE_NAME": "CreateSlots",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 3029,
            "ROLE_NAME": "Requester",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 3024
        },
        {
            "ROLE_ID": 3027,
            "ROLE_NAME": "AGM",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 3024
        },
        {
            "ROLE_ID": 3030,
            "ROLE_NAME": "HRU",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 3024
        },
        {
            "ROLE_ID": 1880,
            "ROLE_NAME": "Director of general administrationk",
            "DESCRIPTION": "jjdkkk",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 1881,
            "ROLE_NAME": "Head of dietary registration  team",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 1882,
            "ROLE_NAME": "Reception Supervisor",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1881
        },
        {
            "ROLE_ID": 1884,
            "ROLE_NAME": "Head of SC team",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1881
        },
        {
            "ROLE_ID": 1885,
            "ROLE_NAME": "SC Preparation Team",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1884
        },
        {
            "ROLE_ID": 1886,
            "ROLE_NAME": "SC Execution Team",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1884
        },
        {
            "ROLE_ID": 1887,
            "ROLE_NAME": "Stability User",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 1888,
            "ROLE_NAME": "Naming User",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 1889,
            "ROLE_NAME": "NODCAR User",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 1890,
            "ROLE_NAME": "Pricing User",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 1891,
            "ROLE_NAME": "Head of TC team",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1881
        },
        {
            "ROLE_ID": 1892,
            "ROLE_NAME": "TC Preparation Team",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1891
        },
        {
            "ROLE_ID": 1893,
            "ROLE_NAME": "TC Execution Team",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1891
        },
        {
            "ROLE_ID": 2041,
            "ROLE_NAME": "Reception Users",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1882
        },
        {
            "ROLE_ID": 2039,
            "ROLE_NAME": "Company",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1881
        },
        {
            "ROLE_ID": 2040,
            "ROLE_NAME": "Company users",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 2039
        },
        {
            "ROLE_ID": 2779,
            "ROLE_NAME": "da",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 2960,
            "ROLE_NAME": "abb",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 2954
        },
        {
            "ROLE_ID": 3324,
            "ROLE_NAME": "GM",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 3024
        },
        {
            "ROLE_ID": 3325,
            "ROLE_NAME": "ChairMan",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 3024
        },
        {
            "ROLE_ID": 4369,
            "ROLE_NAME": "Schedule Per-Ch Process ROLE",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 3823,
            "ROLE_NAME": "TDU",
            "DESCRIPTION": "TDU",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 3024
        },
        {
            "ROLE_ID": 3914,
            "ROLE_NAME": "DM",
            "DESCRIPTION": "DM",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 3024
        },
        {
            "ROLE_ID": 4024,
            "ROLE_NAME": "test2",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 4025
        },
        {
            "ROLE_ID": 4025,
            "ROLE_NAME": "child 2",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 4024
        },
        {
            "ROLE_ID": 4026,
            "ROLE_NAME": "test",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 4019
        },
        {
            "ROLE_ID": 4027,
            "ROLE_NAME": "test 3",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 4029
        },
        {
            "ROLE_ID": 4028,
            "ROLE_NAME": "child 3.2",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 4027
        },
        {
            "ROLE_ID": 4029,
            "ROLE_NAME": "test 4",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 4030,
            "ROLE_NAME": "child 3.1",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 4028
        },
        {
            "ROLE_ID": 3860,
            "ROLE_NAME": "PAU",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 3024
        },
        {
            "ROLE_ID": 4019,
            "ROLE_NAME": "child",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 4026
        },
        {
            "ROLE_ID": 4107,
            "ROLE_NAME": "Medical_Roles",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 4444,
            "ROLE_NAME": "Update Periodic Checkup Schedule",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 4478,
            "ROLE_NAME": "UTTS-Ticket-process",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 4744,
            "ROLE_NAME": "Resolution Queue to Closure Queue",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 4746,
            "ROLE_NAME": "From closure To Close queue",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 4784,
            "ROLE_NAME": "WFM",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 4785,
            "ROLE_NAME": "FO",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 4784
        },
        {
            "ROLE_ID": 5063,
            "ROLE_NAME": "create work order",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 5189,
            "ROLE_NAME": "Last Mile Agent",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 5187
        },
        {
            "ROLE_ID": 5190,
            "ROLE_NAME": "Regions",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 5187
        },
        {
            "ROLE_ID": 5191,
            "ROLE_NAME": "Infrastructure",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 5187
        },
        {
            "ROLE_ID": 5187,
            "ROLE_NAME": "Voice (Installation & Support)",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 6108,
            "ROLE_NAME": "hh",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 6109,
            "ROLE_NAME": "ff",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 6023,
            "ROLE_NAME": "ee",
            "DESCRIPTION": "eeeeeeeeeeeeee",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 6124,
            "ROLE_NAME": "s",
            "DESCRIPTION": "s",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 6123,
            "ROLE_NAME": "TTTEEEESSSTTTT",
            "DESCRIPTION": "DDDDDD",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": 1880
        },
        {
            "ROLE_ID": 6110,
            "ROLE_NAME": "nnk",
            "DESCRIPTION": null,
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        },
        {
            "ROLE_ID": 6143,
            "ROLE_NAME": "-",
            "DESCRIPTION": "-",
            "LAST_MODIFIED_BY": "root",
            "PARENT_ROLE_ID": null
        }
    ];

    this.treeall = this.unflatten(this.tree);
    // for(let x=0 ; x < this.tree.length ; x++ ){
    //     if(this.tree[x].PARENT_ROLE_ID == null ){
    //         this.parent.push(this.tree[x]);                
    //     }else{
    //         this.child.push(this.tree[x]);  
    //     }
    // }

    // this.nodeService.gettree().subscribe((Response: any) => {
    //     this.tree = Response;
    //     console.log(this.tree);
    //     console.log(this.tree.length);

    //      console.log(this.objtree );
    //      this.treeall = this.unflatten(this.tree);
    //      //  document.body.innerHTML = "<pre>" + (JSON.stringify(treeall, null, " "))
    //     for(let x=0 ; x < this.tree.length ; x++ ){
    //      if(this.tree[x].PARENT_ROLE_ID == null ){
    //          this.parent.push(this.tree[x]);                
    //      }else{
    //          this.child.push(this.tree[x]);  
    //      }
    //  }

    //  console.log(this.parent);
    //  console.log(this.parent.length);
    //  console.log(this.child);
    //  console.log(this.child.length);


    //  }); 

  }

    unflatten(arr:any) {


    var tree = [],
        mappedArr = [],
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = arr.length; i < len; i++) {
    arr[i].label = arr[i].ROLE_NAME;

        arrElem = arr[i];
        mappedArr[arrElem.ROLE_ID] = arrElem;
        mappedArr[arrElem.ROLE_ID]['children'] = [];
    }

    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.PARENT_ROLE_ID) {
            mappedArr[mappedElem['PARENT_ROLE_ID']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
            tree.push(mappedElem);
        }
        }
    }
    console.log(tree);
    this.treeall = tree;

    return tree;
    }
 

  
  // private expandRecursive(node:TreeNode, isExpand:boolean){
  //     node.expanded = isExpand;
  //     if (node.children){
  //         node.children.forEach( childNode => {
  //             this.expandRecursive(childNode, isExpand);
  //         } );
  //     }
  // }



//   expandAll(){
//     this.files2.forEach( node => {
//         this.expandRecursive(node, true);
//     } );
// }

// collapseAll(){
//     this.files2.forEach( node => {
//         this.expandRecursive(node, false);
//     } );
// }







}
