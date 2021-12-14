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
  public properties_pages: any;
  public btn_prev_disabled: string;
  public btn_next_disabled: string;
  public show_spinner: boolean;


  constructor(
    private _userService: UserService,
    private _videoService: VideoService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "My Videos";
    this.identity = '';
    this.token = '';
    this.btn_prev_disabled = '';
    this.btn_next_disabled = '';
    this.show_spinner = false;
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
    this.show_spinner = true;

    this._videoService.getVideos(this.token, page).subscribe(
      response => {
        this.videos = response.videos;

        // guardo en esta variable algunas propiedades de cada pagina
        let properties_pages:any = [];
        for(let i = 1; i <= response.total_pages; i++){

          let number:number = i;
          let active:string = '';
          if(i == response.page){
            active = 'active';
          }
          properties_pages.push([number, active]);
        }

        this.properties_pages = properties_pages;

        if(page >= 2){
          this.prev_page = page-1;
          this.btn_prev_disabled = '';
        }else{
          this.prev_page = 1;
          this.btn_prev_disabled = 'disabled';
        }

        if(page < response.total_pages){
          this.next_page = page+1;
          this.btn_next_disabled = '';
        }else{
          this.next_page = response.total_pages;
          this.btn_next_disabled = 'disabled';
        }

        // console.log(this.videos);
        this.show_spinner = false;

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
