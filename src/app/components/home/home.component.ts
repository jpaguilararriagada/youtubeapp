import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSeleccionado: any;
  constructor( private service: YoutubeService ) {
    this.service.getVideos()
                            .subscribe( videos => {
                              console.log(videos);
                              this.videos = videos;
                            });
  }

  ngOnInit() {
  }

  verVideo( video: any ) {
    this.videoSeleccionado = video;
    $('#exampleModal').modal();
  }

  cerrarModal() {
    this.videoSeleccionado = null;
    $('#exampleModal').modal('hide');
  }

  cargarMasVideos() {
    this.service.getVideos()
    .subscribe( videos => {
      this.videos.push.apply(this.videos, videos);
    });
  }

}
