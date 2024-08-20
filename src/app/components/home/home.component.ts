import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MovieShowListService } from 'src/app/services/movie-show-list.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { DetailsComponent } from '../details/details.component';
import { CommonModule } from '@angular/common';
import { SanitizeURLPipe } from 'src/app/sanitize-url.pipe';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { LoadingEpisodesComponent } from '../loading-episodes/loading-episodes.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true,
  imports:[CommonModule,SanitizeURLPipe,CarouselModule,RouterModule,LoadingComponent,LoadingEpisodesComponent]
})
export class HomeComponent implements OnInit {
  /////////////////Variables/////////////////////////////////
  baseUrlImg:string='https://image.tmdb.org/t/p/w500/';
  baseUrlVid:string='https://www.youtube.com/embed/';
  vidData:any[]=[];
  movieList:any[]=[];
  tvList:any[]=[];
  topFive:any[]=[];
  trendingTVList:any[]=[];
  stat1:boolean=false;
  stat2:boolean=false;
  stat3:boolean=false;
  flag:boolean=false;
  /////////////////////////////////////////////////////////////////
  constructor(private _movieShowList:MovieShowListService){}
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
        items: 5
      }
    },
    nav: false,
    rewind:false,
  }
  openMovieDetails(movieId:any):void{
    this._movieShowList.getExternalId(movieId).subscribe({
      next:(data)=>{
          console.log(data.results);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  ngOnInit(): void {
    
    this._movieShowList.showMovies().subscribe({
      next:(data)=>{
        console.log(data.results);
        this.movieList=data.results;
      },
      error:(err)=>{
        console.log(err);
      }
    })
    this._movieShowList.video(872585).subscribe({
      next:(data)=>{
        console.log(data.results);
        this.vidData=data.results;
      }
    })
    this._movieShowList.getTrendingTVShows().subscribe({
      next:(data)=>{
        this.trendingTVList=data.results;
        for(let i=0;i<5;i++){
          this.topFive.push(this.trendingTVList[i])
          console.log(this.topFive);
        }
      }
    })
    this._movieShowList.getTrendingTVShows().subscribe({
      next:(data)=>{
        this.tvList=data.results
        console.log(this.tvList);
      }
    })
  }
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
      this.flag=false;
      if(this.stat1==false){
      openContent?.classList.replace('d-none','animateTab');
      window.dispatchEvent(new Event('resize'));
      this.stat1=true;
      this.flag=true;
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
        window.dispatchEvent(new Event('resize'));
        this.stat2=true;
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
  trackByFn(index:number,item:any):number{
    return item.id;
  }
}
