import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers:[UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public message: string;
  public identity: any;
  public token: string;

  constructor(
    private _userService: UserService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.page_title = "User Settings";
    this.user = new User(this.identity.sub,
                         this.identity.name,
                         this.identity.surname,
                         this.identity.email,
                         '', 'ROLE_USER', '');
    this.status = '';
    this.message = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    // aqui me quede
  }

}
