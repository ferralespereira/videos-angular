import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  public show_spinner: boolean;
  
constructor(
  private _userService: UserService,
  private _router: Router,
  private _route: ActivatedRoute

) {
  this.page_title = "Login";
  this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  this.status = '';
  this.message = '';
  this.token = '';
  this.show_spinner = false;
}
  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form:any){
    this.show_spinner = true;
    this._userService.singup(this.user).subscribe(
      response => {
        if(response.status == 'error'){
          this.status = 'error';
          this.message = response.message;
        }else{
          this.status = 'success';
          this.identity = response;
          
          
          // saco el token
          this._userService.singup(this.user, true).subscribe(
            response => {
              this.token = response;
              
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              
              console.log(this.identity);
              console.log(this.token);

              this._router.navigate(['/home']);
            }
          );

        }

        this.show_spinner = false;

      },
      error => {
        console.log(error);
      }
    );

  }

  logout(){
    this._route.params.subscribe(params => {
      let sure = +params['sure'];

      if(sure == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = '';
        this.token = '';

        this._router.navigate(['/home']);
      }

    });
  }
}
