import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'
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
import { MyProblemesComponent } from './Client/my-problemes/my-problemes.component';
import { ReclamerProblemeComponent } from './Client/reclamer-probleme/reclamer-probleme.component';
import { ReclamationsComponent } from './Support/reclamations/reclamations.component';
import { HeaderSupportNComponent } from './layout/header-support-n/header-support-n.component';
import { CategorieComponent } from './Support/categorie/categorie.component';
import { DetailProblemeComponent, DialogRecivedCall } from './Client/detail-probleme/detail-probleme.component';
import { ListProblemeComponent } from './Support/list-probleme/list-probleme.component';
import { DetailProblemeSupportComponent, DialogOverviewExampleDialog } from './Support/detail-probleme-support/detail-probleme-support.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { DemoMaterialModule } from './material-module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent, ProfilComponent, NotFoundComponent, ProblemeComponent, MyProblemesComponent, ReclamerProblemeComponent, ReclamationsComponent, HeaderSupportNComponent, CategorieComponent, DetailProblemeComponent, ListProblemeComponent, DetailProblemeSupportComponent
    , DialogOverviewExampleDialog, DialogRecivedCall
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DemoMaterialModule

  ],
  providers: [
    AuthGuardService,
    UserService,
    MatDialog,
    Overlay

  ],
  entryComponents: [
    DialogOverviewExampleDialog,
    DialogRecivedCall
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
