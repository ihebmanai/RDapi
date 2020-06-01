import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  autorization = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  }

  url = "http://localhost:3000/categories/";
  constructor(private http: HttpClient) { }
  public add(categorie: any) {
    return this.http.post(this.url, categorie, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
  }
  public delete(id: number) {
    return this.http.delete(this.url + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
  }
  public getAll() {
    return this.http.get(this.url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
  }

}
