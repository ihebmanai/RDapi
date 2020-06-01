import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/models/User';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: user = {};
  modified;
  public imagePath;
  imgURL: any;
  public message: string;
  isphotoSelected = false;
  image: any;



  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getProfil().subscribe(data => {
      this.user = data;
      console.log(data);
    });
  }
  update() {
    const form = new FormData();
    form.append('userPhoto', this.image);
    form.append('name', this.user.name);
    form.append('username', this.user.username);
    form.append('password', this.user.password);
    form.append('email', this.user.email);
    this.userService.update(form).subscribe(data => {
      this.user = data;
      this.modified = true;
    });
  }
  async preview(files) {
    if (files.length === 0) {
      return;
    }
    this.image = files[0];
    console.log(this.image);
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    await reader.readAsDataURL(files[0]);
    reader.onload = async (_event) => {
      this.imgURL = await reader.result;
      this.isphotoSelected = true;
    };
  }
}
