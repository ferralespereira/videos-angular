import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';


@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService, VideoService]
})
export class VideoNewComponent implements OnInit {

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
    this.page_title = "Save New Favorite Video";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.video = new Video(1, this.identity.sub, '', '', '', '', '');
    this.message = '';
    this.status = '';
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._videoService.create(this.token, this.video).subscribe(
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
