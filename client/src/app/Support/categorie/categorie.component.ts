import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories: any[];
  categorie: string = ''
  estAjoutee = false;
  estSupprimee = false;
  nameSupprimee = ''
  constructor(private categorieService: CategorieService) { }

  ngOnInit() {
    this.categorieService.getAll().subscribe((data: any) => {
      this.categories = data;
    })
  }
  add() {
    this.categorieService.add({ categorie: this.categorie }).subscribe((categ) => {
      this.estAjoutee = true;
      this.categories.push(categ);

    }
    )
  }
  delete(id: number, index: number, name: string) {
    this.categorieService.delete(id).subscribe(() => {
      this.nameSupprimee = name;
      this.estSupprimee = true;
      this.categories.splice(index, 1);
    })
  }

}
