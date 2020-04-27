import { Component, OnInit } from '@angular/core';
import { ProblemeService } from 'src/app/services/probleme.service';
import { CategorieService } from 'src/app/services/categorie.service';

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


  constructor(private problemeservice: ProblemeService,
    private categorieService: CategorieService,
  ) { }

  ngOnInit() {
    //Get all Problemes
    this.problemeservice.getAll().subscribe((data: any) => {
      this.listPobleme = data;
      this.problemeStore = data;
    });
    //Get list catégories 
    this.categorieService.getAll().subscribe((data: any) => {
      this.listCategorie = data;
    });

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

}
