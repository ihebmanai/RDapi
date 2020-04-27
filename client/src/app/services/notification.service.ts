import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url = "http://localhost:3000/notification/";
  autorization = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };

  constructor(private http: HttpClient) { }
  /**
   * getAll
   */
  public getAll() {
    return this.http.get(this.url, this.autorization)
  }

  public seenNotif(id) {
    return this.http.put(this.url + id, this.autorization)
  }
}
