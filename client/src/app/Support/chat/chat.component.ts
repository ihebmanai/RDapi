import { Component, OnInit } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CallService } from 'src/app/services/call.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCancel } from '../detail-probleme-support/detail-probleme-support.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
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

  constructor(private serviceProbleme: ProblemeService, private serviceChat: ChatService, private userService: UserService,
    private route: ActivatedRoute, private callService: CallService, public dialog: MatDialog,
  ) { }

  async ngOnInit() {
    this.initIoConnection();
    this.discussionId = this.route.snapshot.paramMap.get('disscussion');

    this.user = await this.userService.getUserDetails();
    this.serviceProbleme.getAll().subscribe((data: any) => {
      this.problemes = data.filter(prob => prob.supportId == this.user.id)
    });

    this.serviceChat.getDiscussionSupport().subscribe(async (diss: any) => {
      this.discussions = await diss;
      this.discussion = await this.discussions.find(d => d.problemeId == this.discussionId)
      if (this.discussionId != 'discussions')
        this.serviceChat.getMessages(this.discussion.id).subscribe(async (data: any) => {
          this.messages = await data;
        })

    })
    this.serviceChat.getDiscussionSupport().subscribe((diss: any) => {
      this.discussions = diss;
    })
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      this.serviceChat.connected(this.user.id)
    })


  }
  /**
   * getUserById
   */
  public getUserById(id) {
    return this.users.find(u => u.id == id);
  }

  public getProbById(id) {
    return this.problemes.find(p => p.id == id);
  }
  private initIoConnection(): void {

    this.serviceChat.initSocket();
    this.callService.initSocket();
    const msgNotif = new Audio();
    msgNotif.src = '../../../assets/sound/msg_sound.wav';
    msgNotif.load();
    this.serviceChat.reciveMessage().subscribe(msg => {
      this.serviceChat.unseen(msg.discussionId).subscribe((data: any) => {
        this.discussions = data.filter(d => d.supportId == this.user.id)
      })
      msgNotif.play();
      if (msg.discussionId == this.discussion.id) {
        this.messages.push(msg);
      }
    });
    this.serviceChat.onlineUsers().subscribe((data) => {
      this.online = data
    })


    this.callService.screenShareAnswzer().subscribe((data) => {
      console.log(data)
      if (data.callId == this.user.id) {
        this.dialogRef.close();

        window.open('http://localhost:3000/index.html', '_blank');
      }
    })

    this.callService.voiceCAllAccepted().subscribe((data) => {
      console.log(data)
      if (data.supportId == this.user.id) {
        this.voiceDiag.close();

        //  window.open('http://localhost:3000/index.html', '_blank');
      }
    })


    this.callService.cancelClient().subscribe((data) => {

      this.voiceDiag.close();
      this.dialog.open(DialogCancel);

    });

  }

  public controleRequest(id) {
    this.callService.call(id, this.user.id);
    this.dialogRef = this.dialog.open(DemandeDiag);
  }

  public voiceCallRequest(clientId) {
    this.callService.voiceCall(clientId, this.user.id);
    this.voiceDiag = this.dialog.open(DialogCancel);
  }


  /**
   * sendMessage
   */
  public sendMessage() {
    let msg = { receiver: this.discussion.clientId, sender: this.user.id, contenu: this.message, discussionId: this.discussion.id }
    this.serviceChat.send(msg).subscribe((data) => {
      this.messages.push(data);
      this.serviceChat.sendMessage(data);
      this.message = '';

    })

  }
  /**
     * getDiscussionAction
     */
  public getDiscussionAction(disc) {
    console.log(disc)
    /*    if (disc.state != 'seen') {
          this.serviceChat.seen(disc.id).subscribe(() => {
            disc.state = 'seen';
          });
        }*/
    this.discussion = disc;
    this.serviceChat.getMessages(disc.id).subscribe((data: any) => {
      this.messages = data
    })

  }

  /**
   * isOnline
   */
  public isOnline(id) {
    return this.online.find(u => u.id == id)
  }
}
@Component({
  selector: 'demande-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DemandeDiag {

}
@Component({
  selector: 'voice-dialog',
  templateUrl: 'voice-call-diag.html',
})
export class voiceCallRequest {

}
@Component({
  selector: 'cancel-dialog',
  templateUrl: 'diag-cancel.html',
})
export class CancelDiag {

}
