import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';


@Injectable()
export class UserService{
  public url: string;
  public identity: any;
  public token: any;

  constructor(private _http: HttpClient){
    this.url = global.url;
  }

  prueba(){
      return "Hola desde el user service de angular";
  }

  register(user:any):Observable<any>{
    let json = JSON.stringify(user);
    let params = 'json='+json;

    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    // hacer peticion ajax
    return this._http.post(this.url+'register', params, {headers: headers});
    
  }

  singup(user:any, gettoken:any = null):Observable<any>{

    if(gettoken != null){
      user.gettoken = 'true';
    }

    let json = JSON.stringify(user);
    let params = 'json='+json;

    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    // hacer peticion ajax
    return this._http.post(this.url+'login', params, {headers: headers});
    
  }

  update(token:string, user:any):Observable<any>{

    let json = JSON.stringify(user);
    let params = 'json='+json;

    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    
    // hacer peticion ajax
    return this._http.put(this.url+'user/edit', params, {headers: headers});

    
  }

  getIdentity(){
    let identity:any = localStorage.getItem('identity');
    identity = JSON.parse(identity);

    if(identity && identity != null && identity != undefined && identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let token:any = localStorage.getItem('token');

    if(token && token != null && token != undefined && token != "undefined"){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }


}