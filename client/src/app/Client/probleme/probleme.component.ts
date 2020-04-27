import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProblemeService } from 'src/app/services/probleme.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  user: any;
  listCategorie: any[];
  probleme: any = { objet: '', description: '', categorie: 0 };
  files: any;
  constructor(
    private route: ActivatedRoute,
    private serviceUser: UserService,
    private categorieService: CategorieService,
    private problemeService: ProblemeService,
    private router: Router

  ) { }

  ngOnInit() {
    let token = this.route.snapshot.paramMap.get('token');
    let payload = '';
    payload = window.atob(token);
    token = JSON.parse(payload).token.token;
    this.user = JSON.parse(window.atob(token.split('.')[1])).user;
    this.serviceUser
      .saveClient({ name: this.user.firstName + ' ' + this.user.lastName })
      .subscribe((token: string) => {
        localStorage.setItem('token', token);
      });
    this.categorieService.getAll().subscribe((data: any) => {
      this.listCategorie = data;
    });
  }
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
