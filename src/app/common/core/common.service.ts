import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public productList: any[] = [];
  public trashItem: string[] = [];
  public addItem = new BehaviorSubject<boolean>(false);
  public searchData = new BehaviorSubject<any>('');
  constructor(private _router: Router) {
    let prodList = window.localStorage.getItem('productItem');
    if (prodList) {
      let data = JSON.parse(JSON.stringify(prodList));
      this.productList = JSON.parse(data);
    }
  }

  get router(): Router {
    return this._router;
  }

  /**
   * This method is used to redirect to specified url
   * @param url
   */
  navigateTo(url:string) {
    this.router.navigate([url]);
  }

  addProductsItem(data: any) {
    this.productList.push(data);
    let prod = JSON.stringify(this.productList);
    window.localStorage.setItem('productItem', prod);
    this.addItem.next(true);
  }

  updateProd(data: any,id:any) {
    this.productList[id] = data;
    let prod = JSON.stringify(this.productList);
    window.localStorage.setItem('productItem', prod);
    this.addItem.next(true);
  }

  searchItem(input:any) {

  }

  removeProductsItem(data:any,type:any) {
    this.productList = this.productList.filter((item:any) => !(item['title'] === data['title']));
    if(type === 'softDelete') {
      this.productList.push(data);
    }
    let prod = JSON.stringify(this.productList);
    window.localStorage.setItem('productItem', prod);
    this.addItem.next(true);
  }


}
