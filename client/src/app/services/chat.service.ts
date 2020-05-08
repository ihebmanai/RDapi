import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket
  autorization = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  }

  url = "http://localhost:3000/discussion/";
  constructor(private http: HttpClient) { }


  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }
  public sendMessage(data) {
    this.socket.emit("send-message", data);
  }
  public reciveMessage(): Observable<any> {
    return new Observable<any>(observer => {
      console.log(observer)
      this.socket.on('recive-message', (data: any) => observer.next(data));
    });
  }
  /**
   * send
   */
  public send(msg) {
    return this.http.post(this.url, msg, this.autorization)
  }
  /**
   * getDisscussion
   */
  public getDiscussion(id) {
    return this.http.get(this.url + 'chat/' + id, this.autorization)
  }

  /**
   * getMessages
   */
  public getMessages(id) {
    return this.http.get(this.url + "msg/" + id, this.autorization);
  }

  /**
   * getDiscussionSupport
   */
  public getDiscussionSupport() {
    return this.http.get(this.url + "support", this.autorization);
  }
  /**
   * getDiscussionSupport
   */
  public getDiscussionClient() {
    return this.http.get(this.url + "client", this.autorization);
  }


  /**
   * connected
   */
  public connected(userId) {
    this.socket.emit("new-user", userId)
  }

  public onlineUsers(): Observable<any> {
    return new Observable<any>(observer => {
      console.log(observer)
      this.socket.on('online-users', (data: any) => observer.next(data));
    });
  }

  public seen(id) {
    return this.http.put(this.url + "seen/" + id, this.autorization);
  }

  public unseen(id) {
    return this.http.put(this.url + "unseen/" + id, this.autorization);
  }
}
