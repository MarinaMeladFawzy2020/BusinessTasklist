import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeNode } from 'src/app/interfaces/treenode';
import { Testdata } from '../interfaces/testdata';
import { Testproduct } from '../interfaces/testproduct';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getCustomersLarge() {
    return this.http.get<any>('assets/customers-large.json');
}


getFiles() {
  return this.http.get<any>('assets/files.json');

  }

  
  
gettree():Observable<any> {
  return this.http.get<any>('assets/testtree.json');
  }

  getProducts() {
    return this.http.get<any>('assets/testproductgroup.json');
}




  // getLazyFiles() {
  // return this.http.get<any>('assets/files-lazy.json')
  //   .toPromise()
  //   .then(res => <TreeNode[]>res.data);
  // }

}
