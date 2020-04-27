import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { CategorieService } from 'src/app/services/categorie.service';
import { ProblemeService } from 'src/app/services/probleme.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-reclamer-probleme",
  templateUrl: "./reclamer-probleme.component.html",
  styleUrls: ["./reclamer-probleme.component.css"]
})
export class ReclamerProblemeComponent implements OnInit {
  user: any = {};
  listCategorie: any[];
  probleme: any = { objet: '', description: '', categorie: 0 };
  files: any;

  constructor(private UserService: UserService,
    private categorieService: CategorieService,
    private problemeService: ProblemeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.UserService.getUserDetails();
    this.categorieService.getAll().subscribe((data: any) => {
      this.listCategorie = data;
    });

  }
  /**
   * addProbleme
   * Add a new Probleme 
   */
  public addProbleme() {
    let form = new FormData();
    form.append('files', this.files);
    form.append('objet', this.probleme.objet);
    form.append('categorie', this.probleme.categorie);
    form.append('description', this.probleme.description);
    this.problemeService.add(form).subscribe((data: any) => {
      this.router.navigateByUrl('/detail/' + data.id);

    })
  }
  async preview(files) {
    if (files.length === 0)
      return;
    this.files = files[0];
    console.log(this.files)
  }


}
