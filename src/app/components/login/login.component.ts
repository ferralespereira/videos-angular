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
  public status: string;
  public message: string;
  
constructor(
  private _userService: UserService
) {
  this.page_title = "Login";
  this.user = new User(1, '', '', '', '', 'ROLE_USER', '');
  this.status = '';
  this.message = '';
}
  ngOnInit(): void {
  }

  onSubmit(form:any){
    // this._userService.register(this.user).subscribe(
    //   response => {
    //     if(response.user){
    //       this.status = 'success';
    //       form.reset();
    //     }else{
    //       this.status = 'error';
    //       if(response.vaidator_error){

    //         if(response.vaidator_error.name){
    //           this.message = response.vaidator_error.name;
    //         }

    //         if(response.vaidator_error.surname){
    //           this.message = response.vaidator_error.surname;
    //         }

    //         if(response.vaidator_error.email){
    //           this.message = response.vaidator_error.email;
    //         }

    //         if(response.vaidator_error.password){
    //           this.message = response.vaidator_error.password;
    //         }

    //       }else{
    //         this.message = response.message;
    //       }
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    console.log(this.user);

  }

}
