import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, VideoService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public identity:any;
  public token:string;
  public videos: any;

  constructor(
    private _userService: UserService,
    private _videoService: VideoService
  ) { 
    this.page_title = "Mis Videos";
    this.identity = '';
    this.token = '';
  }

  ngOnInit(): void {
    this.loadUser();
    this.getVideos();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(){
    this._videoService.getVideos(this.token).subscribe(
      response => {
        //aqui me quede
        this.videos = response.videos;
        console.log(this.videos);
      },
      error => {
        console.log(error);
      }
    );
  }

  getThumb(url:string) {
    var video, results, thumburl;
    
     if (url === null) {
         return '';
     }
     
     results = url.match('[\\?&]v=([^&#]*)');
     video   = (results === null) ? url : results[1];
    
         thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
    
      return thumburl;
        
    }
}
