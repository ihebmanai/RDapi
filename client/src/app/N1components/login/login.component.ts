import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { asyncLocalStorage } from 'src/app/services/utlis'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: ''
  };
  err = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }
  login() {
    this.userService.login(this.user).subscribe(
      async (data: string) => {
        asyncLocalStorage.setItem('token', data).then(() => {
          if (this.userService.getUserDetails().role === "N1")
            this.router.navigateByUrl('/admin/accueil');
          else {
            this.router.navigateByUrl('/accueil');

          }
        })
      },
      (err) => {
        this.err = true;
      }
    );
  }

}
