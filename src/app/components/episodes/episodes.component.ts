import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieShowListService } from 'src/app/services/movie-show-list.service';
import { ActivatedRoute, NavigationEnd,NavigationStart,Event, Router, RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BehaviorSubject } from 'rxjs';
import { animate, style, transition } from '@angular/animations';
import { LoadingEpisodesComponent } from '../loading-episodes/loading-episodes.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [CommonModule,RouterModule,CarouselModule,LoadingEpisodesComponent],
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {
/////////////////////////////////////////////
URL:any=this._activatedRoute.snapshot.params;
episodeData:any=[];
otherEpisodes:any=[];
baseUrlImg:string='https://image.tmdb.org/t/p/w500/';
baseUrlImgOriginal:string='https://image.tmdb.org/t/p/original/';
image:string='';
flag:any;
/////////////////////////////////////////////
  constructor(private _movieShowList:MovieShowListService, private _activatedRoute:ActivatedRoute, public _Router:Router)
  {
    
  }
ngOnInit(): void {
  this._movieShowList.getEpisode(this.URL.id,this.URL.seasonnumber,this.URL.episodenumber).subscribe({
    next:(data)=>{
      console.log(data,"episode details");
      this.episodeData=data;
      this.image=this.baseUrlImgOriginal+data.still_path;
    },
    error:(err)=>{
      console.log(err,"episode error");
    }
  })
  this._movieShowList.getTVSeasons(this.URL.id,this.URL.seasonnumber).subscribe({
    next:(data)=>{
      console.log(data,"other episodes");
      this.otherEpisodes=data;
    },
    error:(err)=>{
      console.log(err,"other episodes error");
    }
  })
}
customOptions2: OwlOptions = {
  loop: false,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: true,
  dots: false,
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
  nav: true,
  

}
trackByFn(index:number,item:any):number{
  return item.id;
}
triggerRoute():void{
  this._Router.events.subscribe((event:Event)=>{
    if(event instanceof NavigationEnd){
      this.URL=this._activatedRoute.snapshot.params
      this._movieShowList.getEpisode(this.URL.id,this.URL.seasonnumber,this.URL.episodenumber).subscribe({
        next:(data)=>{          
          this.flag=true;
          console.log(data,"episode details");
          this.episodeData=data;
          this.image=this.baseUrlImgOriginal+data.still_path;
          this.flag=false;
        },
        error:(err)=>{
          console.log(err,"episode error");
        }
      })    
    }
  })
}
}
