import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  user:any;
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    let token = this.route.snapshot.paramMap.get('token') ;
    let payload = '';
    payload = window.atob(token);
    token = JSON.parse(payload).token.token ;
    this.user = JSON.parse(window.atob(token.split('.')[1]));
    localStorage.setItem('client_token', token);
  }

}
