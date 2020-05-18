import { Component, OnInit } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';
import { CallService } from 'src/app/services/call.service';
import { MatDialog } from '@angular/material/dialog';
import { AnimateTimings } from '@angular/animations';

@Component({
  selector: 'app-chat-client',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatClientComponent implements OnInit {
  problemes = [];
  user: any;
  users: any;
  messages = [];
  message: any;
  discussion: any;
  online = []
  discussions = [];
  discussionId: any;
  SupportCallId: any;

  constructor(private serviceProbleme: ProblemeService, private serviceChat: ChatService, private userService: UserService,
    private route: ActivatedRoute, private callService: CallService, public dialog: MatDialog) { }

  async ngOnInit() {
    this.discussionId = this.route.snapshot.paramMap.get('disscussion');
    this.initIoConnection()
    this.user = await this.userService.getUserDetails();
    this.serviceProbleme.getAll().subscribe((data: any) => {
      this.problemes = data.filter(prob => prob.userId == this.user.id)
      this.serviceChat.connected(this.user.id)

    });
    this.serviceChat.getDiscussionClient().subscribe(async (diss: any) => {
      this.discussions = await diss;
      this.discussion = await this.discussions.find(d => d.problemeId == this.discussionId)
      if (this.discussionId != 'discussions')
        this.serviceChat.getMessages(this.discussion.id).subscribe(async (data: any) => {
          this.messages = await data;
        })

    })
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
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
        this.discussions = data.filter(d => d.clientId == this.user.id)
      })
      msgNotif.play();

      if (msg.discussionId == this.discussion.id) {
        this.messages.push(msg);
      }
    })
    this.serviceChat.onlineUsers().subscribe((data) => {
      this.online = data
    });

    this.callService.voiceIsCalling().subscribe((data) => {
      console.log("okokoko" + data)
      if (data.clientId == this.user.id) {
        const VoiceDiag = this.dialog.open(IsCallingDiag);
        const ring = new Audio();
        ring.src = '../../../assets/sound/telephone-ring-04.wav';
        ring.load();
        ring.play();

        VoiceDiag.afterClosed().subscribe(async result => {
          if (result) {
            ring.pause();
            /*       const constraints = {
                     video: true,
                     audio: true
                   };
                   navigator.mediaDevices.getDisplayMedia(constraints).then((stream) => this.peer1.addStream(stream)).catch((err) => { console.error(err) });*/
            //   window.open('http://localhost:3000/broadcast.html', '_blank');
            this.callService.acceptVoiceCall(data.clientId, data.supportId);
          }
          else {
            ring.pause();
            this.callService.cancel(this.user.id)
          }
          console.log(`Dialog result: ${result}`);
        });
      }
    })

    this.callService.onCall()
      .subscribe(async (call) => {
        console.log(call)
        //if we are calling to solve this issues 
        if (call.callId == this.user.id) {
          //seting RTC ansewer 
          //when we accepte 
          const dialogRef = this.dialog.open(ClientDemandeDiag);
          const ring = new Audio();
          ring.src = '../../../assets/sound/telephone-ring-04.wav';
          ring.load();
          ring.play();

          dialogRef.afterClosed().subscribe(async result => {
            if (result) {
              ring.pause();
              /*       const constraints = {
                       video: true,
                       audio: true
                     };
                     navigator.mediaDevices.getDisplayMedia(constraints).then((stream) => this.peer1.addStream(stream)).catch((err) => { console.error(err) });*/
              window.open('http://localhost:3000/broadcast.html', '_blank');
              this.callService.screenShare(call.offre, 'answer');
            }
            else {
              ring.pause();
              this.callService.cancel(this.user.id)
            }
            console.log(`Dialog result: ${result}`);
          });
        }
      });
  }
  /**
   * sendMessage
   */
  public sendMessage() {
    let msg = { sender: this.user.id, receiver: this.discussion.supportId, contenu: this.message, discussionId: this.discussion.id }
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
    this.discussion = disc;
    this.serviceChat.getMessages(disc.id).subscribe((data: any) => {
      this.messages = data;

    })
  }

  public isOnline(id) {
    return this.online.find(u => u.id == id)
  }


}
@Component({
  selector: 'client-demande-diag',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class ClientDemandeDiag {

}
@Component({
  selector: 'iscalling-diag',
  templateUrl: 'iscalling-request-diag.html',
})
export class IsCallingDiag {

}
