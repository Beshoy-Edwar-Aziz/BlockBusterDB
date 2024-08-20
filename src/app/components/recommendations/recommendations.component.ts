import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, Event, NavigationEnd, RouterModule } from '@angular/router';
import { MovieShowListService } from 'src/app/services/movie-show-list.service';
import { trigger,transition,state,animate,style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule,LoadingComponent,CarouselModule]
})
export class RecommendationsComponent implements OnInit{
  //////////////////////////////////////////////////////////
  ////variables and decorators////
  flag:boolean=false;
  recommendationList:any=[];
  baseUrlImg:string='https://image.tmdb.org/t/p/w500/';
  creditList:any=[];
  SimilarList:any=[];
  id:any;
  actorDetails:any; 
  @Input() closeTrailerInChild!:()=>void;
  /////////////////////////////////////////////////////////////
constructor(private _activatedRoute:ActivatedRoute, private _movieShowList:MovieShowListService,public Router:Router){
Router.events.subscribe((event:Event)=>{
  if(event instanceof NavigationEnd){
    console.log(event.url.slice(9,16));
    this._movieShowList.getData(event.url.slice(9,16));
  }
})
  this._movieShowList.updatePage.subscribe({
    next:(data)=>{
      this.flag=true;
      this.id=data;
      this._movieShowList.getRecommendation(this.id).subscribe({
        next:(data)=>{
          this.recommendationList=data.results
          console.log(data.results);
          console.log(this.id);
        },
        error:(err)=>{
          console.log(err);
        }
      })
      this._movieShowList.getMovieCredits(this.id).subscribe({
        next:(data)=>{
          let credit=data.cast;
          console.log(data.cast);
          this.creditList=credit.slice(0,10)
          console.log(this.creditList);
          
        },
        error:(err)=>{
          console.log(err);
        }
      })
      this._movieShowList.getMoreLikeThis(this.id).subscribe({
        next:(data)=>{
            this.SimilarList=data.results;
        },error:(err)=>
        {
          console.log(err);
        }
      })
      this.flag=false;
    }
  })
}
ngOnInit(): void {
 this.id = this._activatedRoute.snapshot.params
  this._movieShowList.getRecommendation(this.id.id).subscribe({
    next:(data)=>{
      this.flag=true;
      this.recommendationList=data.results;
      console.log(data.results);
      console.log(this.id);
      this.flag=false;
    },
    error:(err)=>{
      console.log(err);
    }
  })
  this._movieShowList.getMovieCredits(this.id.id).subscribe({
    next:(data)=>{
      let credit=data.cast;
      console.log(data.cast);
      this.creditList=credit.slice(0,10);
      console.log(this.creditList);
      
    },
    error:(err)=>{
      console.log(err);
    }
  })
  this._movieShowList.getMoreLikeThis(this.id.id).subscribe({
    next:(data)=>{
      this.SimilarList=data.results;
      console.log(data.results);
    }
  })
  this._movieShowList.getActorDetails(this.id.id).subscribe({
    next:(data)=>{

      console.log("ActorDetails",data);
      this.actorDetails=data;
    }
  })
}
customOptions: OwlOptions = {
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
open(data:any):void{
  this._movieShowList.getData(data);
  window.scrollTo(0,0);
}
stat1:boolean=false;
stat2:boolean=false;
stat3:boolean=false;
openTab(event:any):void{
  let openContent=document.querySelector('.content2');
  let openContent2=document.querySelector('.content1');
  let openContent3=document.querySelector('.content3');
  if(event.target.id=='recommend'){
    openContent2?.classList.replace('animateTab','animateCloseTab');
    openContent2?.classList.replace('animateCloseTab','d-none');
    openContent3?.classList.replace('animateTab','animateCloseTab');
    openContent3?.classList.replace('animateCloseTab','d-none');
    
    this.stat2=false;
    this.stat3=false;
    if(this.stat1==false){
    openContent?.classList.replace('d-none','animateTab');
    this.stat1=true;
    }
    else if(this.stat1==true){
      openContent?.classList.replace('animateTab','animateCloseTab');
      setTimeout(() => {
        openContent?.classList.replace('animateCloseTab','d-none');
      }, 300);
      this.stat1=false;
      console.log(this.stat1);
    }  
  }else if(event.target.id=='movieInfo'){
    openContent?.classList.replace('animateTab','animateCloseTab');
    openContent?.classList.replace('animateCloseTab','d-none');
    openContent3?.classList.replace('animateTab','animateCloseTab');
    openContent3?.classList.replace('animateCloseTab','d-none');
    this.stat1=false;
    this.stat3=false;
    if(this.stat2==false){
      openContent2?.classList.replace('d-none','animateTab');
      this.stat2=true;
      window.dispatchEvent(new Event('resize'));
    }  
    else if(this.stat2==true){
      openContent2?.classList.replace('animateTab','animateCloseTab')
      setTimeout(() => {
        openContent2?.classList.replace('animateCloseTab','d-none');  
      }, 300);
      this.stat2=false;
      console.log(this.stat2);
    }
  }else if(event.target.id=='similartothis'){
    openContent2?.classList.replace('animateTab','animateCloseTab')
    openContent2?.classList.replace('animateCloseTab','d-none')
    openContent?.classList.replace('animateTab','animateCloseTab');
    openContent?.classList.replace('animateCloseTab','d-none')
    this.stat2=false;
    this.stat1=false;
    if(this.stat3==false){
    openContent3?.classList.replace('d-none','animateTab')
    this.stat3=true;
    }else if(this.stat3==true){
      openContent3?.classList.replace('animateTab','animateCloseTab')
      setTimeout(() => {
        openContent3?.classList.replace('animateCloseTab','d-none')  
      }, 300);
      
      this.stat3=false;
      console.log(this.stat3)
    }
    
  }
  let x =document.getElementById(`${event.target.id}`)
  console.log(x);
  
}
closeTrailerOnClick():void{
  this.closeTrailerInChild();
}
trackByFn(index:number,item:any):number{
  return item.id;
}
}
