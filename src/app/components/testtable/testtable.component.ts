import { Component, OnInit } from '@angular/core';
import { Representative, Testdata } from 'src/app/interfaces/testdata';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-testtable',
  templateUrl: './testtable.component.html',
  styleUrls: ['./testtable.component.css']
})
export class TesttableComponent implements OnInit {
[x:string]:any;
  customers!: Testdata[];
  representatives!: Representative[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  products!: any[];
  selectedProducts!: any[];

  constructor(private customerService: TestService) {}

  // applyFilterGlobal( h:any , stringVal: any) {
  //   console.log(h);
  //   this.dt.filterGlobal(h, 'contains');
  // }
 

  ngOnInit() {
//breadcrumb
    this.items = [
      {label: 'PageName' , routerLink: '/'},
      {label: 'PageName2', routerLink: '/'},
  ];
  this.home = {icon: 'pi pi-home', routerLink: '/'};

  this.itemsbars = [
    {
        label: 'Update',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    },
    {
        label: 'Angular',
        icon: 'pi pi-external-link',
        url: 'http://angular.io'
    },
    {
        label: 'Router',
        icon: 'pi pi-upload',
        routerLink: '/fileupload'
    }
];

    this.customerService.getCustomersLarge().subscribe(customers => {
      this.customers = customers;
      this.loading = false;
      console.log(this.customers);
      this.customers.forEach(
        customer => (customer.date = new Date(customer.date))
      );
    });

    this.representatives = [
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "XuXue Feng", image: "xuxuefeng.png" }
    ];

    this.statuses = [
      { label: "Unqualified", value: "unqualified" },
      { label: "Qualified", value: "qualified" },
      { label: "New", value: "new" },
      { label: "Negotiation", value: "negotiation" },
      { label: "Renewal", value: "renewal" },
      { label: "Proposal", value: "proposal" }
    ];



  this.products =[{
    "id": "1000",
    "code": "f230fh0g3",
    "name": "Bamboo Watch",
    "description": "Product Description",
    "image": "bamboo-watch.jpg",
    "price": 65,
    "category": "Accessories",
    "quantity": 24,
    "inventoryStatus": "INSTOCK",
    "rating": 5
  },
  {
    "id": "1001",
    "code": "nvklal433",
    "name": "Black Watch",
    "description": "Product Description",
    "image": "black-watch.jpg",
    "price": 72,
    "category": "Accessories",
    "quantity": 61,
    "inventoryStatus": "INSTOCK",
    "rating": 4
  }]
}

}