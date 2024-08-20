import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieShowListService } from 'src/app/services/movie-show-list.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-actor-detail',
  standalone: true,
  imports: [CommonModule,RouterModule,CarouselModule,LoadingComponent],
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {
  param:any;
  id:number=0;
  baseUrlImg:string='https://image.tmdb.org/t/p/w500/';
  Actordetails:any;
  actorMovieDetails:any;
  flag:boolean=true;
  constructor(public _movieShowList:MovieShowListService, private _activatedRoute:ActivatedRoute){

  }
  customOptions:OwlOptions={
    loop: true,
    mouseDrag: true,
    touchDrag: true,
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
    nav: true
  }
  ngOnInit(): void {
    this.param=this._activatedRoute.snapshot.params;
    console.log(this.param);
    this.id= this.param.id;
    this._movieShowList.getActorDetails(this.id).subscribe({
      next:(data)=>{
          this.Actordetails=data;
          console.log("actordetails",data);
      }
    })
    this._movieShowList.getActorMovies(this.id).subscribe({
      next:(data)=>{
        console.log("actorMovieDetails",data.cast);
        this.actorMovieDetails=data.cast;  
        for(let i=0;i<50;i++){
          this.actorMovieDetails[i];
          }
          this.flag=false;
          console.log(this.actorMovieDetails);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  trackByFn(index:number,item:any):number{
    return item.id;
  }
}
