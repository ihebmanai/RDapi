import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user.service";
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-header-support-n',
  templateUrl: './header-support-n.component.html',
  styleUrls: ['./header-support-n.component.css']
})
export class HeaderSupportNComponent implements OnInit {
  image = "";
  notifications = [];
  discussion = 0;
  constructor(private userServrice: UserService, private notifservice: NotificationService,
    private router: Router,
    private serviceChat: ChatService) { }

  ngOnInit() {
    this.userServrice.getProfil().subscribe(data => {
      this.image = data.image;
    });
    this.notifservice.getAll().subscribe((data: any) => {
      this.notifications = data;
      console.log(data)
    })
    this.userServrice.getProfil().subscribe(data => {
      this.image = data.image;
    });
    this.serviceChat.getDiscussionSupport().subscribe(async (data: any) => {

      this.discussion = await data.length
    })
    this.serviceChat.connected(this.userServrice.getUserDetails().id);
  }
  /**
   * seenNotif
   */
  public seenNotif(id) {
    this.notifservice.seenNotif(id).subscribe((notif: any) => {
      console.log(notif)
      this.router.navigateByUrl('/admin/detail/' + notif.problemeId);
    })
  }
  logout() {
    this.userServrice.logout();
  }
}
