import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
 let token = this.route.snapshot.paramMap.get('token') ;
 let payload = '';
 payload = window.atob(token);

 token = JSON.parse(payload).token.token ;
 localStorage.setItem('token', token);

  }

}
