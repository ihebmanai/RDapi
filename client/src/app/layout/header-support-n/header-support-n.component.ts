import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/services/user.service";
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
  constructor(private userServrice: UserService

    ,
    private router: Router,
    private serviceChat: ChatService) { }

  ngOnInit() {
    this.serviceChat.connected(this.userServrice.getUserDetails().id);
  }
  /**
   * seenNotif
   */
  logout() {
    this.userServrice.logout();
  }
}
