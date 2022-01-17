import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { TestService } from 'src/app/services/test.service';
import { Testproduct } from 'src/app/interfaces/testproduct';

@Component({
  selector: 'app-testtablegroup',
  templateUrl: './testtablegroup.component.html',
  styleUrls: ['./testtablegroup.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]

})
export class TesttablegroupComponent implements OnInit {
  AllData: Testproduct[] = [];
  constructor(private productService: TestService) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe(data => this.AllData = data);
  }

}
