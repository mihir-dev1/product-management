import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductManagementComponent } from './product-management.component';

import { ButtonModule } from 'primeng-lts/button';
import { MessagesModule } from 'primeng-lts/messages';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng-lts/dialog';
import { InputTextModule } from 'primeng-lts/inputtext';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { RadioButtonModule } from 'primeng-lts/radiobutton/radiobutton';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import {BadgeModule} from 'primeng-lts/badge';
import { DropdownModule } from 'primeng-lts/dropdown';
import { ToastModule } from 'primeng-lts/toast';
import {RippleModule} from 'primeng-lts/ripple';

@NgModule({
  declarations: [
    ProductManagementComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    ConfirmDialogModule,
    ButtonModule,
    MessagesModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    // RadioButtonModule,
    DropdownModule,
    InputTextareaModule,
    BadgeModule,
    ToastModule,
    RippleModule
  ]
})
export class ProductManagementModule { }
