import { Component, OnInit } from "@angular/core";
import { user } from "src/app/models/User";
import { UserService } from "src/app/services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user = {
    username: "",
    password: ""
  };
  err=false;

  constructor(private userService: UserService , private router:Router) {}

  ngOnInit() {}
  login() {
    this.userService.login(this.user).subscribe((data:string)=>{
      localStorage.setItem("token",data)
      this.router.navigateByUrl('/');

    }, 
    (err)=>{
 this.err=true
    });
  }
}
