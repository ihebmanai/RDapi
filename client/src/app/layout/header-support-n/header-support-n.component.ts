import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user.service";
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-support-n',
  templateUrl: './header-support-n.component.html',
  styleUrls: ['./header-support-n.component.css']
})
export class HeaderSupportNComponent implements OnInit {
  image = "";
  notifications = [];
  constructor(private userServrice: UserService, private notifservice: NotificationService, private router: Router) { }

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
