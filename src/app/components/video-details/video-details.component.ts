import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css'],
  providers: [UserService, VideoService]
})
export class VideoDetailsComponent implements OnInit {
  public page_title: string;
  public identity: any;
  public token: string;
  public video: any;
  public message: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _videoService: VideoService
  ) { 
    this.page_title = "See Video";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    // this.video = new Video(1, this.identity.sub, '', '', '', '', '');
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

}
