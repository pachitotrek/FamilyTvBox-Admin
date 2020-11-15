import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { PublicidadComponent } from './components/publicidad/publicidad.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { VideosComponent } from './components/videos/videos.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadService } from './services/upload.service';
import { ImagenPipe } from './pipes/imagen.pipe';
import { PayuComponent } from './components/payu/payu.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { LoginGuard } from './services/guards/login.guard';
import { IndexComponent } from './components/index/index.component';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
import { SeriesComponent } from './components/series/series.component';
import { CapitulosComponent } from './components/capitulos/capitulos.component';
import { EditcapituloComponent } from './components/editcapitulo/editcapitulo.component';
import { BlankComponent } from './components/blank/blank.component';
import { EditserieComponent } from './components/editserie/editserie.component';
import { CuponesComponent } from './components/cupones/cupones.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ContenidoComponent,
    PublicidadComponent,
    TiendaComponent,
    VideosComponent,
    HomeComponent,
    ImagenPipe,
    PayuComponent,
    ConfirmationComponent,
    IndexComponent,
    ModalUploadComponent,
    SeriesComponent,
    CapitulosComponent,
    EditcapituloComponent,
    BlankComponent,
    EditserieComponent,
    CuponesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
