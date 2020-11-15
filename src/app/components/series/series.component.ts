import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
  providers:[ApiService,UploadService]
})
export class SeriesComponent implements OnInit {
  seriesForm:FormGroup;
  series:any=[];
  categorias:any=[];
  videomedia: File;
  videosubir: File;
  resultId: any;
  local_servidor: boolean=false;

  constructor(private api:ApiService,private upload:UploadService) {
    this.seriesForm= new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      descripcion: new FormControl(null),
      serie: new FormControl(null),
      servidor: new FormControl(null),
      url: new FormControl(null),
      precio: new FormControl(null),
      time: new FormControl(null),
      disponible: new FormControl(null),
      imagen: new FormControl(null)      
    });
   }

  ngOnInit() {
    this.getSeries();
  }

  getSeries(){
    this.api.getSeries().subscribe((resp:any)=>{
      this.series=resp;
      console.log(this.series);
    });
  }
  agregarCapitulo(){
    this.api.agregarCapitulo(this.seriesForm.value).subscribe((resp:any)=>{
      if(resp.ok==true){
        this.resultId = resp.results;
       
        if(this.videosubir){
          let server = "seriesfile";
          this.upload.subirArchivo(this.videosubir, server, this.resultId).then((resp: any) => {
            this.seriesForm.reset();
            this.getSeries();
            Swal.fire({
              type: 'success',
              title: 'Exito !!',
              text: 'Capitulo creado!'         
            });
    
  
          }).catch((error)=>{
            console.log(error);
  
            this.seriesForm.reset();
            this.getSeries();
            Swal.fire({
              type: 'success',
              title: 'Exito !!',
              text: 'Capitulo creado!'         
            });  
          });

        }else{
          this.seriesForm.reset();
          this.getSeries();
          Swal.fire({
            type: 'success',
            title: 'Exito !!',
            text: 'Capitulo creado!'         
          });  
        }
   
      }
    });   
  }
  getCapitulos(id){
    this.api.getCapitulos(id).subscribe((resp:any)=>{
      console.log(resp);
    });
  }
  seleccionarVideo(archivo: File) {
    if (!archivo) {
      this.videosubir = null;
      return;
    }

    if (archivo.type.indexOf('video') < 0) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Solo se aceptan Videos!'
      })
    }

    this.videosubir = archivo;
  }
  uploadServidor(event) {
    console.log(event.value);
    if (event.value == 3) {
      this.local_servidor = true;
    } else {
      this.local_servidor = false;
    }
  }
  selectVideo(item) {
    console.log(item);
    this.seriesForm.setValue(item);
  }

}
