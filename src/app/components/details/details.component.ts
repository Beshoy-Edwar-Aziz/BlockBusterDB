import { CommonModule } from '@angular/common';
import { Component,OnInit, AfterViewInit, OnDestroy, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MovieShowListService } from 'src/app/services/movie-show-list.service';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { LoadingComponent } from '../loading/loading.component';
import { SanitizeURLPipe } from 'src/app/sanitize-url.pipe';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  standalone:true,
  imports:[CommonModule,RecommendationsComponent,LoadingComponent,RouterModule,SanitizeURLPipe]
})
export class DetailsComponent implements OnInit{
  key:any;
  autoplay:number=0;
constructor(private _movieShowList:MovieShowListService,private _activatedRoute:ActivatedRoute, private _titleService:Title){
  //to ensure the page to keep loading new data using behavior subject
  this._movieShowList.updatePage.subscribe({
    
    next:(data)=>{
      console.log(data);
      this.id=data;
      this.flag=true;
      this._movieShowList.getExternalId(this.id).subscribe({
        next:(data)=>{
          this.movieIMDB=data.imdb_id;
          this.updateData.next(this.movieIMDB)
          this.updateData.subscribe({
            next:(data)=>{
              console.log(data);
              this.movieIMDB=data;
              
            }
          })
          this._movieShowList.getDetailsById(this.movieIMDB).subscribe({
            next:(data)=>{
              this.details=data.movie_results[0];
              this._titleService.setTitle(this.details.title)
              this.image=this.baseUrlImg+this.details.poster_path
              console.log(this.details);
              this.flag=false;
              
            }
          })
          this._movieShowList.getMovieTrailer(this.id).subscribe({
            next:(data)=>{
              
                    this.key=data.results[0].key;
                    console.log("Key",this.key);
                    this.vidKey=data.results;
                    console.log("videos",this.vidKey);
            },
            error:(err)=>{
              console.log(err);
            }
          })
          
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }) 
  this.id=this._activatedRoute.snapshot.params;
  console.log(this.id)
  
}
//////////////////////////////////////////////////////////////
details:any=[];
baseUrlImg:string='https://image.tmdb.org/t/p/w500/';
baseUrlVid:string='https://www.youtube.com/embed/';
image:string=''
id:any;
movieIMDB:any;
flag:boolean=false;
video:any;
ytPlayer:any;
updatePage:BehaviorSubject<any>=new BehaviorSubject(null);
updateData:BehaviorSubject<any>=new BehaviorSubject(null);
vidKey:any=[];
VideoThumbnail:string="https://img.youtube.com/vi/";
//////////////////////////////////////////////////////////////
ngOnInit(): void {
  this.id=this._activatedRoute.snapshot.params;
  console.log(this.id)
  this._movieShowList.getExternalId(this.id.id).subscribe({
    next:(data)=>{
      this.movieIMDB=data.imdb_id;
      this._movieShowList.getDetailsById(this.movieIMDB).subscribe({
        next:(data)=>{
          this.details=data.movie_results[0];
          this._titleService.setTitle(this.details.title)
          this.image=this.baseUrlImg+this.details.poster_path
          console.log(this.image);
        }
      })
      this._movieShowList.getMovieTrailer(this.id.id).subscribe({
        next:(data)=>{
          this.key=data.results[0].key;
          console.log("Key",this.key);
          this.vidKey=data.results;
          console.log("videos",this.vidKey);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    },
    error:(err)=>{
      console.log(err);
    }
    
  })
  
}
openTrailer():void{
  let detailsTitle= document.querySelector('.movie-title');
  let detailsImage= document.querySelector('.movie-image');
  let detailsBackground= document.querySelector('.closeCurtains');
  let openVideo = document.querySelector('.loadVideo');
  let getRow= document.querySelector('.closePage');
  let getBack= document.querySelector('.secOfDetails');
  detailsTitle?.classList.replace('enter','moveright');
  detailsImage?.classList.replace('enter','moveleft');
  detailsBackground?.classList.replace('trans','darkenTheRoom');
  getRow?.classList.add('d-none');
  getBack?.classList.add('d-none');
  setTimeout(() => {
    openVideo?.classList.replace('d-none','d-block');
  }, 1000);
  this.autoplay=1;
  window.scrollTo(0,0);
}
closeTrailer():void{
  let detailsTitle= document.querySelector('.movie-title');
  let detailsImage= document.querySelector('.movie-image');
  let detailsBackground= document.querySelector('.closeCurtains');
  let getRow= document.querySelector('.closePage');
  let getBack= document.querySelector('.secOfDetails');
  let openVideo = document.querySelector('.loadVideo');
  detailsTitle?.classList.replace('moveright','enter');
  detailsImage?.classList.replace('moveleft','enter');
  getRow?.classList.remove('d-none');
  getBack?.classList.remove('d-none');
  detailsBackground?.classList.replace('darkenTheRoom','trans');
  openVideo?.classList.replace('d-block','d-none');
  this.autoplay=0;
}
closeTrailerInChild=():void=>{
this.closeTrailer();
}
getVideo(videoKey:string):void{
  this.key=videoKey;
}

}
