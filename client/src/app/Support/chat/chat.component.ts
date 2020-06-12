import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CallService } from 'src/app/services/call.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  problemes = [];
  user: any;
  users: any;
  messages = [];
  message: any;
  discussions = [];
  discussion: any;
  online = [];
  discussionId;
  dialogRef: any;
  voiceDiag: any;
  room: any;
  clientId = 0;
  disabled: boolean = false;
  public client: string;
  clients = [];
  constructor(
    private serviceChat: ChatService,
    private userService: UserService,
    private callService: CallService,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.initIoConnection();

    this.user = await this.userService.getUserDetails();
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.clients = data;
      this.serviceChat.connected(this.user.id);
    });
  }


  private initIoConnection(): void {
    this.serviceChat.initSocket();
    this.callService.initSocket();
    const msgNotif = new Audio();

    this.serviceChat.onlineUsers().subscribe((data) => {
      this.online = data;
    });

    this.callService.screenShareAnswzer().subscribe((data) => {
      console.log(data);
      if (data.callId == this.user.id) {
        this.dialogRef.close();

        window.open('http://localhost:3000/index.html', '_blank');
      }
    });

    this.callService.voiceCAllAccepted().subscribe((data) => {
      console.log(data);
      if (data.supportId == this.user.id) {
        this.voiceDiag.close();
        window.open(
          'http://localhost:3000/voicecall.html#' + this.room,
          '_blank'
        );
      }
    });

    this.callService.cancelClient().subscribe((data) => {
      this.voiceDiag.close();
      this.dialog.open(CancelDiag);
    });
  }

  public controleRequest(id) {
    this.callService.call(id, this.user.id);
    this.dialogRef = this.dialog.open(DemandeDiag);
  }

  public voiceCallRequest(clientId) {
    this.room = Math.random().toString(20).substr(2, 6);
    this.callService.voiceCall(clientId, this.user.id, this.room);
    this.voiceDiag = this.dialog.open(voiceCallRequest);
  }

  /**
   * sendMessage
   */

  /**
   * getDiscussionAction
   */
  public getSelectedClient(id) {
    this.clientId = id;
    if (this.isOnline(id))
      this.disabled = true
    else
      this.disabled = false;
  }
  /**
   * searchClient
   */
  public searchClient() {
    this.clients = this.users.filter(u => u.name.includes(this.client));

  }

  /**
   * isOnline
   */
  public isOnline(id) {
    return this.online.find((u) => u.id == id);
  }
}
@Component({
  selector: 'app-demande-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DemandeDiag { }
@Component({
  selector: 'app-voice-dialog',
  templateUrl: 'voice-call-diag.html',
})
export class voiceCallRequest { }
@Component({
  selector: 'app-cancel-dialog',
  templateUrl: 'diag-cancel.html',
})
export class CancelDiag { }
