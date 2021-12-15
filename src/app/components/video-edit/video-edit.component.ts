import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';


@Component({
  selector: 'app-video-edit',
  templateUrl: '../video-new/video-new.component.html',
  styleUrls: ['./video-edit.component.css'],
  providers: [UserService, VideoService]
})
export class VideoEditComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: string;
  public video: Video;
  public message: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService
  ) { 
    this.page_title = "Edit Video";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.video = new Video(1, this.identity.sub, '', '', '', '', '');
    this.message = '';
    this.status = '';
  }

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(){
    this._route.params.subscribe(params => {
      let id:number = +params['id'];

      this._videoService.getVideo(this.token, id).subscribe(
        response => {
          if(response.status == 'success'){
            this.video = response.video;
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  onSubmit(form:any){
    this._videoService.update(this.token, this.video, this.video.id).subscribe(
      response => {
        // console.log(response);
        if(response.status == 'success'){
          this.status = 'success';
        }else{
          this.status = 'error';
          this.message = response.message;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
