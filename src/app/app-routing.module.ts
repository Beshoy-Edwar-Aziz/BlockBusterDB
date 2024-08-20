import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent,title:'BlockBuster', data:{animation:'Home'}},
  {path:'details/:id',data:{animation:'details'},loadComponent:()=>import('./components/details/details.component').then((x)=>x.DetailsComponent)},
  {path:'actordetail/:id',data:{animation:'Home'},loadComponent:()=>import('./components/actor-detail/actor-detail.component').then((x)=>x.ActorDetailComponent)},
  {path:'TVDetail/:id',data:{animation:'details'},loadComponent:()=>import('./components/tvdetails/tvdetails.component').then((x)=>x.TVDetailsComponent)},
  {path:'episode/:id/:seasonnumber/:episodenumber',data:{animation:'details'},loadComponent:()=>import('./components/episodes/episodes.component').then(x=>x.EpisodesComponent)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
