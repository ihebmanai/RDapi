import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { ProblemeService } from 'src/app/services/probleme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public problemes = [];
  constructor(private route: ActivatedRoute, private problemeService: ProblemeService) { }

  ngOnInit() {
    this.problemeService.getAll().subscribe((data: any) => {
      this.problemes = data;
    })

  }

  /**
   * getProblemeByState
   */
  public getProblemeByState(state: string) {
    return this.problemes.filter((prob) => prob.state === state).length;
  }

}
