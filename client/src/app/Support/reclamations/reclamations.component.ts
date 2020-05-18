import { Component, OnInit } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/models/User';
import { async } from '@angular/core/testing';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {
  public listPobleme = [];
  public problemeStore = [];
  public problemeState = '';
  public listCategorie = [];
  public categorie = 0;
  public users: any;
  public user: any
  online = []
  constructor(private problemeservice: ProblemeService,
    private categorieService: CategorieService,
    private userService: UserService,
    private serviceChat: ChatService
  ) { }

  async ngOnInit() {
    this.serviceChat.initSocket();

    //Get all Problemes
    this.problemeservice.getAll().subscribe((data: any) => {
      this.listPobleme = data;
      this.problemeStore = data;
    });

    this.user = await this.userService.getUserDetails()
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;

    })
    //Get list catégories 
    this.categorieService.getAll().subscribe((data: any) => {
      this.listCategorie = data;
    });
    this.serviceChat.getUsers()

    this.serviceChat.onlineUsers().subscribe((data) => {
      this.online = data
    })


  }
  /**
   * search
   */
  public search() {
    console.log(this.problemeState)
    if (this.problemeState == 'all') {
      this.listPobleme = this.problemeStore;
    }
    else {
      this.listPobleme = this.problemeStore.filter((prob) => prob.state == this.problemeState)
    }
  }
  public searchCat() {
    console.log(this.categorie);
    if (this.categorie == 0) {
      this.listPobleme = this.problemeStore;
    } else {
      this.listPobleme = this.problemeStore.filter((prob) => prob.categorieId == this.categorie)
    }

  }
  public getUserById(id) {
    return this.users.find(u => u.id == id)
  }
  /**
   * getCategorieById
   */
  public getCategorieById(id) {
    return this.listCategorie.find(u => u.id == id)

  }


  public isOnline(id) {
    return this.online.find(u => u.id == id)
  }


}
