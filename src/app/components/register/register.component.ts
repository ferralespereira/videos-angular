import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService]
})
export class RegisterComponent implements OnInit {

    public page_title: string;
    public user: User;
    
  constructor(
    private _userService: UserService
  ) {
    this.page_title = "Register";
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit(): void {
    // console.log(this.user);
    console.log(this._userService.prueba());
  }

  onSubmit(form:any){

    console.log(this.user);

  }

}