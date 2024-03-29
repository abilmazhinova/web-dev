import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Album } from '../model';
import { AlbumsService } from '../albums.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-albums-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './albums-detail.component.html',
  styleUrl: './albums-detail.component.css'
})
export class AlbumsDetailComponent implements OnInit{
  

  album!: Album;
  loaded: boolean = false;
  newTitle = '';

  constructor(private route: ActivatedRoute,
              private albumService: AlbumsService) {
  }

  ngOnInit(){
    this.route.paramMap.subscribe((params) =>{
      if(params.get('id')){
        const albumId = Number(params.get('id'));
        this.loaded = false;
        this.albumService.getAlbum(albumId).subscribe((album)=>{
          this.album = album;
          this.loaded = true;
        });
      }
    });
  }

  editTitleAlbum(title: string){
    const userId = this.album.userId;
    const id = this.album.id;
    const album: Album = {
      userId, id, title
    }

    this.albumService.updateAlbum(album).subscribe(()=>{
      console.log("updated");
      this.album.title = album.title;
    })
  }

}
