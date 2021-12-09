import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from '../models/video';
import { global } from './global';


@Injectable()
export class VideoService{
  public url: string;
  public identity: any;
  public token: any;

  constructor(private _http: HttpClient){
    this.url = global.url;
  }

  create(token:string, video:any):Observable<any>{

    let json = JSON.stringify(video);
    let params = 'json='+json;

    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    
    // hacer peticion ajax
    return this._http.post(this.url+'video/new', params, {headers: headers});
  }


  getVideos(token:string):Observable<any>{

    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    
    // hacer peticion ajax
    return this._http.get(this.url+'video/list', {headers: headers});
  }

  getVideo(token:string, id:any):Observable<any>{

    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    
    // hacer peticion ajax
    return this._http.get(this.url+'video/detail/'+id, {headers: headers});
  }


  update(token:string, video:any, id:any):Observable<any>{

    let json = JSON.stringify(video);
    let params = 'json='+json;

    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    
    // hacer peticion ajax
    return this._http.put(this.url+'video/edit/'+id, params, {headers: headers});
  }

  delete(token:string, id:any):Observable<any>{

    // definir las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    
    // hacer peticion ajax
    return this._http.delete(this.url+'video/remove/'+id, {headers: headers});
  }

}