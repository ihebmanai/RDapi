import { Component, OnInit } from "@angular/core";
import { user } from "src/app/models/User";
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  user: user = {
    name: "",
    username: "",
    password: "",
    email: ""
  };
  constructor(private userService:UserService ,private router:Router) {}

  ngOnInit() {}
  
  register():void{

this.userService.register(this.user).subscribe((data:string)=>{
  console.log(data)
localStorage.setItem("token",data)
this.router.navigateByUrl('/');

},
()=>{console.log("err")}
)

  }
}
