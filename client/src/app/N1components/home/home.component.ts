import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
 const token = this.route.snapshot.paramMap.get('token')
 let payload= '';
 payload = token.split(".")[1];
 payload = window.atob(token);
 console.log(JSON.parse(payload));
  }

}
