import { Component, OnInit } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

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
  constructor(private serviceProbleme: ProblemeService, private serviceChat: ChatService, private userService: UserService) { }

  async ngOnInit() {
    this.initIoConnection();
    this.user = await this.userService.getUserDetails();
    this.serviceProbleme.getAll().subscribe((data: any) => {
      this.problemes = data.filter(prob => prob.supportId == this.user.id)
    });
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
    const msgNotif = new Audio();
    msgNotif.src = '../../../assets/sound/msg_sound.wav';
    msgNotif.load();
    this.serviceChat.reciveMessage().subscribe(msg => {
      this.serviceChat.unseen(msg.discussionId).subscribe((data: any) => {
        this.discussions = data
      })
      msgNotif.play();
      if (msg.discussionId == this.discussion.id) {
        this.messages.push(msg);
      }
    });
    this.serviceChat.onlineUsers().subscribe((data) => {
      console.log(data)
      this.online = data
    })
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
