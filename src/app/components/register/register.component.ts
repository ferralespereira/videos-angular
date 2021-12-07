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
    public status: string;
    public message: string;
    
  constructor(
    private _userService: UserService
  ) {
    this.page_title = "Register";
    this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
    this.status = '';
    this.message = '';
  }

  ngOnInit(): void {
    // console.log(this.user);
    console.log(this._userService.prueba());
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
      response => {
        if(response.user){
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
          if(response.vaidator_error){

            if(response.vaidator_error.name){
              this.message = response.vaidator_error.name;
            }

            if(response.vaidator_error.surname){
              this.message = response.vaidator_error.surname;
            }

            if(response.vaidator_error.email){
              this.message = response.vaidator_error.email;
            }

            if(response.vaidator_error.password){
              this.message = response.vaidator_error.password;
            }

          }else{
            this.message = response.message;
          }
        }
      },
      error => {
        console.log(error);
      }
    );
    // console.log(this.user);
  }

}