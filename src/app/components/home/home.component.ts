import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  public page: any;
  public next_page: any;
  public prev_page: any;
  public number_pages: any;
  

  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "My Videos";
    this.identity = '';
    this.token = '';
  }

  ngOnInit(): void {
    this.loadUser();

    // recojo la page de la url y envio la peticion de obtener las paginas con paginacion el backend
    this._route.params.subscribe(params => {
      let page:any = +params['page'];

      if(!page){
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }

      this.getVideos(page);
    });

  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(page:any){
    this._videoService.getVideos(this.token, page).subscribe(
      response => {
        //aqui me quede
        this.videos = response.videos;

        let number_pages:any = [];
        for(let i = 1; i <= response.total_pages; i++){
          number_pages.push(i);
        }

        this.number_pages = number_pages;

        if(page >= 2){
          this.prev_page = page-1;
        }else{
          this.prev_page = 1;
        }

        if(page < response.total_pages){
          this.next_page = page+1;
        }else{
          this.next_page = response.total_pages;
        }

        // console.log(this.videos);
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
