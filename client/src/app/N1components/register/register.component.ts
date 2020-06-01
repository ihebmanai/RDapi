import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    username: '',
    password: '',
    password2: '',
    email: ''
  };
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  register(): void {
    this.userService.register(this.user).subscribe(
      (data: string) => {
        console.log(data);
        localStorage.setItem('token', data);
        this.router.navigateByUrl('/home');
      },
      () => {
        console.log('err');
      }
    );
  }
}
