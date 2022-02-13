import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { TrashProductComponent } from './modules/trash-product/trash-product.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('./modules/product-management/product-management.module').then(
            (m) => m.ProductManagementModule
          ),
        data: {
          title: 'List',
        },
      },
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent,
        data: {
          title: 'Details',
        },
      },
      {
        path: 'delete-products',
        component: TrashProductComponent,
        data: {
          title: 'Trash',
        },
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
