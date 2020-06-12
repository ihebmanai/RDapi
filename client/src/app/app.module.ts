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
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './N1components/home/home.component';
import { ProfilComponent } from './N1components/profil/profil.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { DemoMaterialModule } from './material-module';
import { ChatComponent, DemandeDiag, CancelDiag, voiceCallRequest } from './Support/chat/chat.component';
import { ChatClientComponent, ClientDemandeDiag, IsCallingDiag } from './Client/chat/chat.component';
import { HeaderSupportNComponent } from './layout/header-support-n/header-support-n.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HomeComponent, ProfilComponent,
    NotFoundComponent,
    ChatComponent, ChatClientComponent,
    DemandeDiag, CancelDiag, ClientDemandeDiag, voiceCallRequest,
    IsCallingDiag, HeaderSupportNComponent
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
    DemandeDiag,
    CancelDiag,
    ClientDemandeDiag,
    voiceCallRequest,
    IsCallingDiag
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
