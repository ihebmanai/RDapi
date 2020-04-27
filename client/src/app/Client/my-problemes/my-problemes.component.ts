import { Component, OnInit } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';

@Component({
  selector: 'app-my-problemes',
  templateUrl: './my-problemes.component.html',
  styleUrls: ['./my-problemes.component.css']
})
export class MyProblemesComponent implements OnInit {
  listProbleme = [];
  constructor(private problemeservice: ProblemeService) { }

  ngOnInit() {
    console.log("ok")
    this.problemeservice.getMyProbleme().subscribe((data: any) => {
      this.listProbleme = data;
      console.log(data)
    });
  }

}
