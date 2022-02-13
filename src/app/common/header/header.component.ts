import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivationEnd, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng-lts/api';
import { CommonService } from '../core/common.service';
import { fromEvent } from 'rxjs';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';
import { MessageService } from 'primeng-lts/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit {
  @ViewChild('inputBox') inputBox!: ElementRef;

  displayModal!: boolean;

  displayBasic!: boolean;

  productForm!: FormGroup;

  val2: number = 3;

  title? = '';

  public files: any[];

  public hideSearch = '';

  public stockOption = [
    { name: 'inStock', value: 'In Stock' },
    { name: 'outOfStock', value: 'out of Stock' },
  ];

  constructor(
    private primengConfig: PrimeNGConfig,
    private _fb: FormBuilder,
    private _common: CommonService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.router.events.subscribe((val) => {
      if (
        val instanceof ActivationEnd &&
        val.snapshot.data.hasOwnProperty('title')
      ) {
        this.hideSearch = val.snapshot.data['title'];
        this.title = val.snapshot.data['title'];
      }
    });
    this.files = [];
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.productForm = this._fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      img: ['', [Validators.required]],
      price: ['', [Validators.required]],
      inStock: [''],
      isActive: [true],
    });
  }

  ngAfterViewInit() {
    const search = fromEvent(this.inputBox.nativeElement, 'keyup').pipe(
      map((event: any) => event['target']['value']),
      debounceTime(500),
      distinctUntilChanged()
    );

    search.subscribe((res) => {
      // console.log(res, 'res');
      // this._common.searchItem(res);
      this._common.searchData.next(res);
      // this.reqData = res;

      setTimeout(() => {
        // this.reqData = null;
      }, 2000);
    });
  }

  showModalDialog() {
    this.displayModal = true;
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  onBasicUpload(event: string) {
    // console.log(event);
  }

  searchProd(searchInput: any) {
    // console.log(searchInput.value);
  }

  saveData() {
    if (this.productForm.status == 'INVALID') {
      if (!this.productForm.controls.title.value) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Title is required and max length is 50',
        });
      }
      if (!this.productForm.controls.description.value) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Description is required and max length is 150',
        });
      }
      if (!this.productForm.controls.img.value) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Image is required',
        });
      }
      if (!this.productForm.controls.price.value) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Price is required',
        });
      }
    } else {
      if (!this.productForm.controls['inStock'].value) {
        let data: any = {};
        data['name'] = 'inStock';
        data['value'] = 'In Stock';
        this.productForm.controls['inStock'].setValue(data);
      }
      this.displayBasic = false;
      this._common.addProductsItem(this.productForm.value);
      this.productForm.reset();
      this.productForm.controls['isActive'].setValue(true);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Add Products Successfully',
      });
      this.productForm.controls['img'].patchValue('');
    }
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
}
