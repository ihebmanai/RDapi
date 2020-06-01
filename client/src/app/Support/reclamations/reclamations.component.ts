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
  public myprobleme: any;
  public users: any;
  public user: any
  online = [];
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

    //get loged user
    this.user = await this.userService.getUserDetails()
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;

    })
    //Get list catégories 
    this.categorieService.getAll().subscribe((data: any) => {
      this.listCategorie = data;
    });

    this.serviceChat.getUsers();
    //get Online users to get User state (Actif/Inactif)
    this.serviceChat.onlineUsers().subscribe((data) => {
      this.online = data
    })


  }
  /**
   * GET probleme by State
   */
  public search() {
    if (this.problemeState == 'all') {
      this.listPobleme = this.problemeStore;
    }
    else {
      this.listPobleme = this.problemeStore.filter((prob) => prob.state == this.problemeState)
    }
  }

  /**
   * GET problemes by catégorie
   */
  public searchCat() {

    if (this.categorie == 0) {
      this.listPobleme = this.problemeStore;
    } else {
      this.listPobleme = this.problemeStore.filter((prob) => prob.categorieId == this.categorie)
    }

  }
  /**
   * GET my problemes
   */
  public myproblemes() {
    if (this.myprobleme)
      this.listPobleme = this.problemeStore.filter((prob) => prob.supportId == this.user.id)
    else
      this.listPobleme = this.problemeStore;

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

  /**
     * Return user state (Actif/Inactif)
     */
  public isOnline(id) {

    return this.online.find(u => u.id == id)
  }


}
