import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url = "http://localhost:3000/comment/";
  autorization = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  };

  constructor(private http: HttpClient) { }
  /**
   * add
   */
  public add(comment: any, problemeId: any) {
    return this.http.post(this.url + problemeId, comment, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  }
  public getAll(problemeId: any) {
    return this.http.get(this.url + problemeId, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
  }

}
