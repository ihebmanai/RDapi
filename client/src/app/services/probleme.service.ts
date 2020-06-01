import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProblemeService {
  url = "http://localhost:3000/problemes/";
  autorization = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };
  constructor(private http: HttpClient) { }
  /**
   * add
   */
  public add(probleme) {
    return this.http.post(this.url, probleme, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })

  }
  /**
   * getById
   */
  public getById(id) {
    return this.http.get(this.url + 'getById/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })

  }
  /**
   * get Probleme by authentified user 
   */
  public getMyProbleme() {
    return this.http.get(this.url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
  }
  /**
   * getAll problemes
   */
  public getAll() {
    return this.http.get(this.url + 'getAll', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
  }
  /**
   * affecteSupport
   */
  public affecteSupport(id) {
    return this.http.get(this.url + 'affect/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
  }
  public problemeResolu(id) {
    return this.http.put(this.url + 'resolu/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
  }
  public problemeFermer(id) {
    return this.http.put(this.url + 'fermer/' + id, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
  }


}
