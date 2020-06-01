import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  image = '';
  notifications = [];
  discussion = 0;
  constructor(private userServrice: UserService, private notifservice: NotificationService,
    private router: Router, private serviceChat: ChatService) { }

  async ngOnInit() {
    await this.userServrice.getProfil().subscribe(async data => {
      this.image = data.image;
    });
    await this.notifservice.getAll().subscribe((data: any) => {
      this.notifications = data;
      console.log(data);
    });
    this.serviceChat.getDiscussionClient().subscribe(async (data: any) => {

      this.discussion = await data.length;
    });
    this.serviceChat.connected(this.userServrice.getUserDetails().id);
  }

  public seenNotif(id) {
    this.notifservice.seenNotif(id).subscribe((notif: any) => {
      console.log(notif);
      this.router.navigateByUrl('/detail/' + notif.problemeId);
    });
  }

  logout() {
    this.userServrice.logout();
  }
}
