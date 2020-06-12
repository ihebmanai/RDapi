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

  /**
   * connected
   */
  public connected(userId) {
    this.socket.emit("new-user", userId)
  }

  public onlineUsers(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('online-users', (data: any) => observer.next(data));
    });
  }

  public getUsers() {
    this.socket.emit('get-users');
  }
}
