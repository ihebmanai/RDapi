import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import  {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './N1components/login/login.component';
import { RegisterComponent } from './N1components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './N1components/home/home.component';
import { ProfilComponent } from './N1components/profil/profil.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { ProblemeComponent } from './Client/probleme/probleme.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,ProfilComponent, NotFoundComponent, ProblemeComponent
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    

  ],
  providers: [
    AuthGuardService , 
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
