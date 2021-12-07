import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity: any;
  public token: string;
  public status: string;
  public message: string;
  
constructor(
  private _userService: UserService
) {
  this.page_title = "Login";
  this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  this.status = '';
  this.message = '';
  this.token = '';
}
  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.singup(this.user).subscribe(
      response => {
        if(response.status == 'error'){
          this.status = 'error';
          this.message = response.message;
        }else{
          this.status = 'success';
          this.identity = response;

          console.log(this.identity);

          // saco el token
          this._userService.singup(this.user, true).subscribe(
            response => {
                this.token = response;

                console.log(this.token);
            }
          );

        }
      },
      error => {
        console.log(error);
      }
    );

  }

}
