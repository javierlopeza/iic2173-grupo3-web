import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes} from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { UserService } from './user.service';
import { AuthGuard} from './auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TokenComponent } from './token/token.component';
import { HistoryComponent } from './history/history.component';

import { ApiService } from './api.service';
import { HttpModule } from '@angular/http';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';



const appRoutes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'home',
    component: HomeComponent//,
    //canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'product',
    component: ProductFormComponent//,
    //canActivate: [AuthGuard]
  },
  {
    path: 'order',
    component: OrderFormComponent//,
    //canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent//,
    //canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsComponent//,
    //canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent//,
    //canActivate: [AuthGuard]
  },
  {
    path: 'history',
    component: HistoryComponent//,
    //canActivate: [AuthGuard]
  },
  {
    path: 'token',
    component: TokenComponent//,
    //canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    RegisterFormComponent,
    ProductFormComponent,
    OrderFormComponent,
    CategoriesComponent,
    NavbarComponent,
    ProductsComponent,
    CheckoutComponent,
    HistoryComponent,
    TokenComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    HttpModule,
    ClipboardModule,
  ],
  providers: [UserService, AuthGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
