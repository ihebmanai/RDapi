import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
const SERVER_URL = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class CallService {
  private socket
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
      this.socket.on('calling', (data: any) => observer.next(data));
    });
  }

  public screenShareAnswzer(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('answer-made', (data: any) => observer.next(data));
    });
  }

  public cancel(callId): void {
    this.socket.emit('cancel', callId);
  }
  public cancelClient(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('cancelClient', (data: any) => observer.next(data));
    });
  }
  public answer(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("answer", (data) => observer.next(data));
    });
  }
  public voiceCall(clientId, supportId, room) {
    this.socket.emit('voice-call', { clientId, supportId, room })
  }
  public voiceIsCalling(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('voice-calling', (data: any) => observer.next(data));
    });
  }
  public acceptVoiceCall(clientId, supportId) {
    this.socket.emit('accept-voice-call', { clientId, supportId })
  }
  public voiceCAllAccepted(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('voice-call-accepted', (data: any) => observer.next(data));
    });
  }











}
