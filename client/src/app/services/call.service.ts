import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
const SERVER_URL = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class CallService {
  private socket;

  constructor() { }

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }
  public call(callId: any, offre: any): void {

    this.socket.emit('call', { offre: offre, callId: callId });

  }
  public screenShare(callId: any, answer: any): void {

    this.socket.emit("make-answer", {
      answer,
      callId: callId
    });

  }

  public onCall(): Observable<any> {
    return new Observable<any>(observer => {
      console.log(observer)
      this.socket.on('calling', (data: any) => observer.next(data));
    });
  }

  public screenShareAnswzer(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('answer-made', (data: any) => observer.next(data));
    });
  }

  public cancelClient(callId): void {
    this.socket.emit('cancelClient', callId);
  }
  public cancel(callId): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('cancel', (data: any) => observer.next(data));
    });
  }
  public answer(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("answer", (data) => observer.next(data));
    });
  }
  public watcher(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("watcher", (id) => observer.next(id));
    });
  }
  public offer(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("offer", (data) => observer.next(data));
    });
  }
  public candidate(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("candidate", (data) => observer.next(data));
    });
  }
  public connect(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("connect", () => observer.next());
    });
  }
  public broadcaster(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("broadcaster", () => observer.next());
    });
  }









}
