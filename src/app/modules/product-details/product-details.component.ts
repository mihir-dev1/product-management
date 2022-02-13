import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  public prodId!: number;
  public prodDetails: any;
  public productList;
  constructor(public router: ActivatedRoute) {
    this.router.params.subscribe((params) => (this.prodId = params.id));
    let prodList = window.localStorage.getItem('productItem');
    if (prodList) {
      let data = JSON.parse(JSON.stringify(prodList));
      this.productList = JSON.parse(data);
      this.prodDetails = this.productList[this.prodId];
    }
  }

  ngOnInit(): void {}
}
