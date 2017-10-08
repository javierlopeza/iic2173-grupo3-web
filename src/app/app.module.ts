import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes} from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserService } from './user.service';
import { AuthGuard} from './auth.guard'

const appRoutes:Routes = [
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
  }


]



@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomeComponent,
    RegisterFormComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
