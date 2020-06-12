import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public problemes = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

  }

  /**
   * getProblemeByState
   */

}
