import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { ProductEditPageComponent } from './product-edit-page/product-edit-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  {
    path: 'product-edit/:id',
    component: ProductEditPageComponent,
    canActivate: [AuthGuard],
    data: { adminOnly: true },
  },
  {
    path: 'product-edit',
    component: ProductEditPageComponent,
    canActivate: [AuthGuard],
    data: { adminOnly: true },
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NotFoundPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
