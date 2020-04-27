import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./N1components/login/login.component";
import { RegisterComponent } from "./N1components/register/register.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { HomeComponent } from "./N1components/home/home.component";
import { ProfilComponent } from "./N1components/profil/profil.component";
import { NotFoundComponent } from "./layout/not-found/not-found.component";
import { ProblemeComponent } from "./Client/probleme/probleme.component";
import { MyProblemesComponent } from "./Client/my-problemes/my-problemes.component";
import { ReclamerProblemeComponent } from "./Client/reclamer-probleme/reclamer-probleme.component";
import { CategorieComponent } from './Support/categorie/categorie.component';
import { DetailProblemeComponent } from './Client/detail-probleme/detail-probleme.component';
import { ReclamationsComponent } from './Support/reclamations/reclamations.component';
import { DetailProblemeSupportComponent } from './Support/detail-probleme-support/detail-probleme-support.component';
import { ListProblemeComponent } from './Support/list-probleme/list-probleme.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: "problemes",
    component: MyProblemesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "reclamations",
    component: ReclamationsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "guacamole",
    component: ListProblemeComponent,
  },
  {
    path: "admin/detail/:id",
    component: DetailProblemeSupportComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: "categorie",
    component: CategorieComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "detail/:id",
    component: DetailProblemeComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: "profile",
    component: ProfilComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "reclamer",
    component: ReclamerProblemeComponent,
    canActivate: [AuthGuardService]
  },
  { path: "support/:token", component: ProblemeComponent },

  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
