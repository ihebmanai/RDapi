import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { user } from "../models/User";
import { async } from "@angular/core/testing";
import { Router } from '@angular/router';
import { puts } from 'util';
@Injectable({
  providedIn: "root"
})
export class UserService {
   headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
  url:string="http://localhost:3000";
  constructor(private http: HttpClient ,private router: Router) {}

  login(user):any {
    return this.http.post(this.url+"/users/login", user);
  }
  //Parse the Token payload into an Object 
  public getUserDetails():any {
    const token = localStorage.getItem("token");
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  //Test if there is a valid token 
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  //Déconnexion
  public logout(): void {
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
  //POST Inscritpion
  public register (user:user){
   return  this.http.post(this.url+"/users/register", user);
  }
  //Get Profile
  public getProfil():Observable<user>{

    return this.http.get<user>(this.url+'/users/profil',{ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
  }
  public update(user){
    return this.http.put(this.url+"/users/update",user, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
  }
}

