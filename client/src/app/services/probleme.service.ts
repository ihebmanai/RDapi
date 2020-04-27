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
    return this.http.post(this.url, probleme, this.autorization)

  }
  /**
   * getById
   */
  public getById(id) {
    return this.http.get(this.url + 'getById/' + id, this.autorization)

  }
  /**
   * get Probleme by authentified user 
   */
  public getMyProbleme() {
    return this.http.get(this.url, this.autorization)
  }
  /**
   * getAll problemes
   */
  public getAll() {
    return this.http.get(this.url + 'getAll', this.autorization)
  }
  /**
   * affecteSupport
   */
  public affecteSupport(id) {
    return this.http.get(this.url + 'affect/' + id, this.autorization)
  }
  public problemeResolu(id) {
    return this.http.put(this.url + 'resolu/' + id, this.autorization)
  }
  public problemeFermer(id) {
    return this.http.put(this.url + 'fermer/' + id, this.autorization)
  }


}
