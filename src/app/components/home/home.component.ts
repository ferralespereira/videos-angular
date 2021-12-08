import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public identity:any;
  public token:string;

  constructor(
    private _userService: UserService
  ) { 
    this.page_title = "Mis Videos";
    this.identity = '';
    this.token = '';
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
