import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { from, Observable } from "rxjs";
import { user } from "../models/User";
import { async } from "@angular/core/testing";
import { Router } from "@angular/router";
import { puts } from "util";
@Injectable({
  providedIn: "root"
})
export class UserService {
  autorization = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  }

  url = "http://localhost:3000";
  constructor(private http: HttpClient, private router: Router) { }

  login(user: { username: string; password: string }): any {
    return this.http.post(this.url + "/users/login", user);
  }
  // Parse the Token payload into an Object
  public getUserDetails(): any {
    const token = localStorage.getItem("token");
    let payload: string;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  // Test if there is a valid token
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  // Déconnexion
  public logout(): void {
    window.localStorage.removeItem("token");
    this.router.navigateByUrl("/");
  }
  // POST Inscritpion
  public register(user: {
    name: string;
    username: string;
    password: string;
    password2: string;
    email: string;
  }) {
    return this.http.post(this.url + "/users/register", user, this.autorization);
  }
  // Get Profile
  public getProfil(): Observable<user> {
    return this.http.get<user>(this.url + "/users/profil",
      this.autorization);
  }
  public update(user: FormData) {
    return this.http.put(this.url + "/users/update", user, this.autorization);
  }

  public saveClient(client: { name: string }) {
    return this.http.post(this.url + "/users/saveclient", client);
  }
  /**
   * getAllUsers
   */
  public getAllUsers(): Observable<any> {
    return this.http.get(this.url + "/users/getAll", this.autorization);

  }
}
