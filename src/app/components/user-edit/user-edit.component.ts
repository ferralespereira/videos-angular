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
    // console.log(this.user);
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';

          this.identity = response.user;
          this.user = response.user;
          localStorage.setItem('identity', JSON.stringify(this.user));
        }else{
          this.status = 'error';
          this.message = response.message;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
