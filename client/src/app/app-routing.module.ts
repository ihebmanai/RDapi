import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./N1components/login/login.component";
import { RegisterComponent } from "./N1components/register/register.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { HomeComponent } from "./N1components/home/home.component";
import { ProfilComponent } from "./N1components/profil/profil.component";
import { NotFoundComponent } from "./layout/not-found/not-found.component";
import { ChatComponent } from './Support/chat/chat.component';
import { ChatClientComponent } from './Client/chat/chat.component';


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },

  {
    path: "profile",
    component: ProfilComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: "admin/accueil",
    component: ChatComponent,
    canActivate: [AuthGuardService]

  },
  {
    path: "accueil",
    component: ChatClientComponent,
    canActivate: [AuthGuardService]

  },

  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
