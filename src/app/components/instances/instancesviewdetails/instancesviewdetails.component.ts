import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstaceslistService } from 'src/app/services/instaceslist.service';
declare var $ :any;
@Component({
  selector: 'app-instancesviewdetails',
  templateUrl: './instancesviewdetails.component.html',
  styleUrls: ['./instancesviewdetails.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class InstancesviewdetailsComponent implements OnInit {
[x:string]:any;
pageNo = new Map();


  //breadcrumb
  items = [
    {label: 'Instance List' , routerLink: '/instancelist'},
    {label: 'Instance List Details' , routerLink: '/instancelistDetails'}
  ];
    home = {icon: 'pi pi-home', routerLink: '/instancelist'};

    datasliders = [
      {"name":'page1'} ,
      {"name":'page2'}
    ]


  constructor(private myinstancelist : InstaceslistService , private route:ActivatedRoute   , private router: Router ) { 
    this.process_INSTANCE_ID = (this.route.snapshot.queryParamMap.get('process_INSTANCE_ID'));
  }

  onNodeSelect(event: { node: { label: any; }; }) {
    // alert(event.node.label)
   // console.log(event)
    // this.messageService.add({severity: 'success', summary: 'Node Selected', detail: event.node.label});
   }
 
   setPage(page:any , idindex:any ){
    console.log(page);
    console.log(this.pageNo);
    //hashmap
    this.pageNo.set(idindex, page.page);
    console.log(this.pageNo.get(idindex));
    
}


  ngOnInit(): void {
    //194687
    this.myinstancelist.getHireachyInstance(this.process_INSTANCE_ID).subscribe((Response: any) => {
      this.AllProcesses = Response.body;
      console.log(this.AllProcesses);
       this.treeall = this.unflatten(this.AllProcesses);
       console.log(this.treeall);


   }); 

   // ScrollZoom
   this.scroll_zoom = this.ScrollZoom($('#containerzoom'),4,0.5)

  }



  viewlistactivites(){
    this.router.navigate(["/instancelistactivities"] ,  { queryParams: {process_INSTANCE_ID: this.process_INSTANCE_ID }});

  }


  unflatten(arr:any) {
    var tree = [],
        mappedArr = [],
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for(var i = 0, len = arr.length; i < len; i++) {
      arr[i].label = arr[i].process_INSTANCE_NAME;
      arr[i].data = "";
       arr[i].type =  'person';       
        arrElem = arr[i];
        mappedArr[arrElem.process_INSTANCE_ID] = arrElem;
        mappedArr[arrElem.process_INSTANCE_ID]['children'] = [];
        this.pageNo.set(arrElem.process_INSTANCE_ID,0);

    }

    for (var id in mappedArr) {
      // console.log(id);
        if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parent_PROCESS_INST_ID) {
            mappedArr[mappedElem['parent_PROCESS_INST_ID']]['children'].push(mappedElem);
            // mappedElem.type = 'departmentchild';

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
 
    //zoom
    zoomIn()
    {
        this.Page = document.getElementById('Zoom');
        var zoom = parseInt(this.Page.style.zoom) + 10 +'%'
        this.Page.style.zoom = zoom;
        return false;
    }
     
     zoomOut()
    {
       this.Page = document.getElementById('Zoom');
        var zoom = parseInt(this.Page.style.zoom) - 10 +'%'
        this.Page.style.zoom = zoom;
        return false;
    }
    reset()
    {
       this.Page = document.getElementById('Zoom');
        var zoom = 80 +'%'
        this.Page.style.zoom = zoom;
        return false;
    }


     ScrollZoom(container: { children: () => { (): any; new(): any; first: { (): any; new(): any; }; }; offset: () => any; },max_scale: number,factor: number){
      var target = container.children().first()
      var size = {w:target.width(),h:target.height()}
      var pos = {x:0,y:0}
      var zoom_target = {x:0,y:0}
      var zoom_point = {x:0,y:0}
      var scale = 1
      target.css('transform-origin','0 0')
      target.on("mousewheel DOMMouseScroll",scrolled)
    
      function scrolled(e: { pageX: number; pageY: number; preventDefault: () => void; delta: any; originalEvent: { wheelDelta: any; detail: any; }; }){
        var offset = container.offset()
        zoom_point.x = e.pageX - offset.left
        zoom_point.y = e.pageY - offset.top
    
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        if (delta === undefined) {
            //we are on firefox
            delta = e.originalEvent.detail;
          }
          delta = Math.max(-1,Math.min(1,delta)) // cap the delta to [-1,1] for cross browser consistency
    
          // determine the point on where the slide is zoomed in
          zoom_target.x = (zoom_point.x - pos.x)/scale
          zoom_target.y = (zoom_point.y - pos.y)/scale
    
          // apply zoom
          scale += delta*factor * scale
          scale = Math.max(1,Math.min(max_scale,scale))
    
          // calculate x and y based on zoom
          pos.x = -zoom_target.x * scale + zoom_point.x
          pos.y = -zoom_target.y * scale + zoom_point.y
    
    
          // Make sure the slide stays in its container area when zooming out
          if(pos.x>0)
              pos.x = 0
          if(pos.x+size.w*scale<size.w)
            pos.x = -size.w*(scale-1)
          if(pos.y>0)
              pos.y = 0
           if(pos.y+size.h*scale<size.h)
            pos.y = -size.h*(scale-1)
    
            target.css('transform','translate('+(pos.x)+'px,'+(pos.y)+'px) scale('+scale+','+scale+')')

      }
    
     
    }



    
// mouseWheelFunc(event: any) {
//   alert("kk")
//   var event = window.event || event; // old IE support
//   console.log("mouseWheelFunc");
//   console.log(event);
//   var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
//   if(delta > 0) {
//       this.mouseWheelUp.emit(event);
//   } else if(delta < 0) {
//       this.mouseWheelDown.emit(event);
//   }
//   event.returnValue = false;
//   // for Chrome and Firefox
//   if(event.preventDefault) {
//       event.preventDefault();
//   }
// }
}







// this.dataorg = [{
//   label: 'rootttt',
//   type: 'person',
//   styleClass: 'p-person',
//   expanded: false,
//   data: {name:'Naming Process', 'version': 'Version 28'},
//   children: [
//       {
//           label: 'children 1',
//           type: 'person',
//           styleClass: 'p-person',
//           expanded: false,
//           data: {name:'Naming Process', 'version': 'Version 28'},
//           children:[{
//               label: 'children 1.1',
//               styleClass: 'department-cfo'
//           },
//           {
//               label: 'children 1.2',
//               styleClass: 'department-cfo'
//           }],
//       },
//       {
//           label: 'children 2',
//           type: 'person',
//           styleClass: 'p-person',
//           expanded: false,
//           data: {name:'Naming Process', 'version': 'Version 28'},
//           children:[{
//               label: 'children 2.1',
//               styleClass: 'department-coo'
//           }]
//       },
//       {
//           label: 'children 3',
//           type: 'person',
//           styleClass: 'p-person',
//           expanded: false,
//           data: {name:'Naming Process', 'version': 'Version 28'},
//           children:[{
//               label: 'children 3.1',
//               styleClass: 'department-cto',
//               expanded: false,
//               children:[{
//                   label: 'children 3.1.1',
//                   styleClass: 'department-cto'
//               },
//               {
//                   label: 'children 3.1.2',
//                   styleClass: 'department-cto'
//               }]
            
//           },
//            ]
//       }
//   ]
// }];
