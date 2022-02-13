import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/core/common.service';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { Message } from 'primeng-lts/api';
import { PrimeNGConfig } from 'primeng-lts/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ProductManagementComponent implements OnInit {
  public productList: any;
  msgs: Message[] = [];

  position?: string;
  productForm!: FormGroup;
  displayBasic!: boolean;
  files: any;
  selectedIndex: any;
  public temp: any;
  public stockOption = [
    { name: 'inStock', value: 'In Stock' },
    { name: 'outOfStock', value: 'out of Stock' },
  ];

  constructor(
    private _common: CommonService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private _fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.productForm = this._fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      img: ['', [Validators.required]],
      price: ['', [Validators.required]],
      inStock: ['', [Validators.required]],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this._common.addItem.subscribe((res) => {
      if (res === true) {
        let prodList = window.localStorage.getItem('productItem');
        this.productList = JSON.parse(JSON.stringify(prodList));
        this.productList = JSON.parse(this.productList);
        // console.log(this.productList, '2');
      }
    });
    let prodList = window.localStorage.getItem('productItem');
    this.productList = JSON.parse(JSON.stringify(prodList));
    this.productList = JSON.parse(this.productList);
    this.temp = JSON.parse(JSON.stringify(this.productList));
    this._common.searchData.subscribe((searchTram) => {
      // console.log(searchTram, 'searchItem');
      if (searchTram.length < 2) {
        this.productList = this.temp;
        return;
      } else {
        this.productList = this.temp.filter((row: any) => {
          if (row.title) {
            return (
              !searchTram ||
              row.title.toLowerCase().includes(searchTram.toLowerCase())
            );
          }
        });
      }
    });
  }

  onStock(event: any) {
    this.productList = this.temp;
    this.productList = this.productList.filter(
      (x: any) => x['inStock']['name'] === 'inStock'
    );
  }

  outOfStock(event: any) {
    this.productList = this.temp;
    this.productList = this.productList.filter(
      (x: any) => x['inStock']['name'] === 'outOfStock'
    );
  }

  resetStock(event: any) {
    let prodList = window.localStorage.getItem('productItem');
    this.productList = JSON.parse(JSON.stringify(prodList));
    this.productList = JSON.parse(this.productList);
    this.temp = JSON.parse(JSON.stringify(this.productList));
  }

  productDetails(id: number) {
    this._common.navigateTo('product-details/' + id);
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.productForm.controls['img'].setValue(reader.result);
      // console.log(reader.result);
    });
    reader.readAsDataURL(this.files[0]);
    // console.log(this.files)
  }

  updateProductDetails(id: number) {
    this.displayBasic = true;
    this.selectedIndex = id;
    this.productForm.controls.title.patchValue(this.productList[id]['title']);
    this.productForm.controls.description.patchValue(
      this.productList[id]['description']
    );
    this.productForm.controls.img.patchValue(this.productList[id]['img']);
    this.productForm.controls.price.patchValue(this.productList[id]['price']);
    this.productForm.controls.isActive.patchValue(
      this.productList[id]['isActive']
    );
  }

  updateProduct() {
    this._common.updateProd(this.productForm.value, this.selectedIndex);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Update Products Successfully',
    });
  }

  deleteProduct(item: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        item['isActive'] = false;
        this._common.removeProductsItem(item, 'softDelete');
        this.msgs = [
          { severity: 'info', summary: 'Confirmed', detail: 'Record deleted' },
        ];
      },
      reject: () => {
        this.msgs = [
          {
            severity: 'info',
            summary: 'Rejected',
            detail: 'You have rejected',
          },
        ];
      },
    });
    // console.log(item)
  }
}
