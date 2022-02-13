import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './layout/home/home.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HeaderComponent } from './common/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DialogModule } from 'primeng-lts/dialog';
import { ButtonModule } from 'primeng-lts/button';
import { InputTextModule } from 'primeng-lts/inputtext';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { RadioButtonModule } from 'primeng-lts/radiobutton';
import { DropdownModule } from 'primeng-lts/dropdown';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { RatingModule } from 'primeng-lts/rating';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { TrashProductComponent } from './modules/trash-product/trash-product.component';
import { BadgeModule } from 'primeng-lts/badge';
import { ToastModule } from 'primeng-lts/toast';
import {RippleModule} from 'primeng-lts/ripple';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    ProductDetailsComponent,
    TrashProductComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
    RatingModule,
    HttpClientModule,
    BadgeModule,
    ToastModule,
    RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
