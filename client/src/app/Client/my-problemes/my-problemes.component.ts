import { Component, OnInit } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';
import { UserService } from 'src/app/services/user.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-my-problemes',
  templateUrl: './my-problemes.component.html',
  styleUrls: ['./my-problemes.component.css']
})
export class MyProblemesComponent implements OnInit {
  listProbleme = [];
  users: any;
  categories;
  constructor(private problemeservice: ProblemeService, private userService: UserService, private categrorieService: CategorieService) { }

  ngOnInit() {
    this.problemeservice.getMyProbleme().subscribe((data: any) => {
      this.listProbleme = data;
    });
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    })
    this.categrorieService.getAll().subscribe(cats => {
      this.categories = cats;
    })
  }
  /**
   * getUserById
   */
  public getUserById(id) {
    return this.users.find(u => u.id == id);
  }
  public getCatsById(id) {
    return this.categories.find(u => u.id == id);
  }
}
