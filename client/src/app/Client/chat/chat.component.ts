import { Component, OnInit } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

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
  constructor(private serviceProbleme: ProblemeService, private serviceChat: ChatService, private userService: UserService) { }

  async ngOnInit() {
    this.initIoConnection()
    this.user = await this.userService.getUserDetails();
    this.serviceProbleme.getAll().subscribe((data: any) => {
      this.problemes = data.filter(prob => prob.userId == this.user.id)
      this.serviceChat.connected(this.user.id)

    });
    this.serviceChat.getDiscussionClient().subscribe((diss: any) => {
      this.discussions = diss;
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
    })
    this.serviceChat.onlineUsers().subscribe((data) => {
      this.online = data
    })
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
