import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


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

import { ApiService } from './api.service';
import { HttpModule } from '@angular/http';
import { ProductsComponent } from './products/products.component';



const appRoutes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'product',
    component: ProductFormComponent
  },
  {
    path: 'order',
    component: OrderFormComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  }
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    HttpModule
    
  ],
  providers: [UserService, AuthGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
