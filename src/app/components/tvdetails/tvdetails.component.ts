import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MovieShowListService } from 'src/app/services/movie-show-list.service';
import { LoadingEpisodesComponent } from '../loading-episodes/loading-episodes.component';
import { SanitizeURLPipe } from 'src/app/sanitize-url.pipe';
import { timeout } from 'rxjs';
declare let bootstrap:any
@Component({
  selector: 'app-tvdetails',
  templateUrl: './tvdetails.component.html',
  styleUrls: ['./tvdetails.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule,CarouselModule,LoadingEpisodesComponent,SanitizeURLPipe]
})
export class TVDetailsComponent implements OnInit{
  ///////////////////////////////////////////////////////////
  id:any;
  baseUrlImg:string='https://image.tmdb.org/t/p/w500/';
  baseUrlImgOriginal:string='https://image.tmdb.org/t/p/original/';
  image:string='';
  TVDetails:any=[];
  seasonNumber:number=1;
  TVEpisodes:any=[];
  TVShowVideos:any=[];
  VideoThumbnail:string="https://img.youtube.com/vi/";
  baseUrlVid:string='https://www.youtube.com/embed/';
  vidKey:string='';
  autoplay:any;
  flag:boolean=false;
  //////////////////////////////////////////////////////////////
  constructor(private _movieShowList:MovieShowListService, private _Router:ActivatedRoute,private _titleService:Title){}
  ngOnInit(): void {
    console.log(this._Router.snapshot.params);
    this.id=this._Router.snapshot.params;
    this._movieShowList.getTVDetails(this.id.id).subscribe({
      next:(data)=>{
        console.log(data);
        this.TVDetails=data;
        this.image=this.baseUrlImgOriginal+data.backdrop_path;
        this._titleService.setTitle(data.name);   
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this._movieShowList.getTVSeasons(this.id.id,this.seasonNumber).subscribe({
      next:(data)=>{
        console.log(data,"Seasons")
        this.TVEpisodes=data;
        window.dispatchEvent(new Event('resize'));
      },
      error:(err)=>{
        console.log(err,"Season Error");
      }
    })
    this._movieShowList.getTVShowVideos(this.id.id).subscribe({
      next:(data)=>{
        this.TVShowVideos=data.results;
      },
      error:(err)=>{
        console.log(err,"TVShowVideos Error");
      }
    })
  }
  trackByFn(index:number,item:any):number{
    return item.id;
  }
  takeSeasonNumber(event:any,index:number=1):void{

    console.log(event.target.innerText.slice(7,9));
    console.log(index,"index");
    window.dispatchEvent(new Event('resize'));
    if(event.target.innerText.slice(7,9)!=0&&event.target.innerText.slice(7,9)>0){
    this._movieShowList.getTVSeasons(this.id.id,event.target.innerText.slice(7,9)).subscribe({
      next:(data)=>{
        this.flag=true;
        console.log(data,"Seasons")
        this.TVEpisodes=data;
        this.flag=false;
        this._titleService.setTitle(this.TVDetails.name);
      },
      error:(err)=>{
        this.flag=true;
        console.log(err,"Season Error");
        this.flag=false;
      }
    })
  }
  else{
      this._movieShowList.getTVSeasons(this.id.id,index).subscribe({
        next:(data)=>{
          this.flag=true;
          console.log(data,"Seasons")
          this.TVEpisodes=data;
          this.flag=false;
        },
        error:(err)=>{
          this.flag=true;
          console.log(err,"Season Error");
          this.flag=false;
        }
      }) 
      console.log(index,"enter");
  }
  } 
  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
    rewind:true,
    
  }
  chooseVideoToWatch(vidKey:string){
    this.vidKey=vidKey;
    console.log(this.baseUrlVid+this.vidKey); 
    let background=document.querySelector('.background');
    let video=document.querySelector('.video');
    let videoDetails=document.querySelector('.show-details');
    let btn=document.querySelector('.close-video');
    background?.classList.replace('open-background','close-background');
    videoDetails?.classList.add('d-none');
    setTimeout(() => {
      background?.classList.add('d-none');
      video?.classList.remove('d-none');
      btn?.classList.remove('d-none');  
    }, 1000);
  }
  stopVideo(){
    let background=document.querySelector('.background');
    let video=document.querySelector('.video');
    let videoDetails=document.querySelector('.show-details');
    let btn=document.querySelector('.close-video');
    background?.classList.replace('close-background','open-background');
    videoDetails?.classList.remove('d-none');
    setTimeout(() => {
      background?.classList.remove('d-none');
      video?.classList.add('d-none');
      btn?.classList.add('d-none');  
    }, 1000);
    this.autoplay=0;
  }
}
