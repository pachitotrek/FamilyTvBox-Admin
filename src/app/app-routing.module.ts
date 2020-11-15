import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PublicidadComponent } from './components/publicidad/publicidad.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { VideosComponent } from './components/videos/videos.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { PayuComponent } from './components/payu/payu.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { LoginGuard } from './services/guards/login.guard';
import { IndexComponent } from './components/index/index.component';
import { SeriesComponent } from './components/series/series.component';
import { EditcapituloComponent } from './components/editcapitulo/editcapitulo.component';
import { BlankComponent } from './components/blank/blank.component';
import { EditserieComponent } from './components/editserie/editserie.component';
import { CuponesComponent } from './components/cupones/cupones.component';

const routes: Routes = [
  {path:'',component:BlankComponent},
  {path:'login',component:LoginComponent},
  {path:'confirmation',component:ConfirmationComponent},
  {path:'home',component:HomeComponent,canActivate:[LoginGuard],children:
    [
      {path:'publicidad',component:PublicidadComponent},
      {path:'index',component:IndexComponent},
      {path:'tienda',component:TiendaComponent},
      {path:'cupones',component:CuponesComponent},
      {path:'videos',component:VideosComponent},
      {path:'contenido',component:ContenidoComponent},
      {path:'series',component:SeriesComponent},
      {path:'editar/:id',component:EditcapituloComponent} ,
      {path:'editarserie/:id',component:EditserieComponent}          
    ]
  },
  {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
