import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-editcapitulo',
  templateUrl: './editcapitulo.component.html',
  styleUrls: ['./editcapitulo.component.scss']
})
export class EditcapituloComponent implements OnInit {
  id:string;
  item: any=[];
  seriesForm: FormGroup;
  series: any=[];
  videosubir: File;
  local_servidor: boolean;
  resultId: any;

  constructor(private route:ActivatedRoute,private api:ApiService,private upload:UploadService,private router:Router) {
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
    this.id= this.route.snapshot.paramMap.get("id"); 
    this.getSeries();
    this.getCapitulos(this.id);
  }
  getCapitulos(id){
    this.api.getSerieId(id).subscribe((resp:any)=>{
      this.item=resp.results[0];
      this.seriesForm.setValue(this.item);
    });   
  }
  getSeries(){
    this.api.getSeries().subscribe((resp:any)=>{
      this.series=resp;
      console.log(this.series);
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
  agregarCapitulo(){
    this.api.actualizarSerie(this.seriesForm.value).subscribe((resp:any)=>{
      if(resp.ok==true){
        if(this.videosubir){
          this.resultId = this.item.id;
          let server = "seriesfile";
          this.upload.subirArchivo(this.videosubir, server, this.resultId).then((resp: any) => {
            this.seriesForm.reset();        
            Swal.fire({
              type: 'success',
              title: 'Exito !!',
              text: 'Capitulo creado!'         
            }); 
            this.router.navigate(['/home/series']);    
  
          }).catch((error)=>{
            console.log(error);
            this.seriesForm.reset();
            this.getSeries();
            Swal.fire({
              type: 'success',
              title: 'Exito !!',
              text: 'Capitulo creado!'         
            });
            this.router.navigate(['/home/series']);  
          });
        }else{
          this.seriesForm.reset();        
          Swal.fire({
            type: 'success',
            title: 'Exito !!',
            text: 'Capitulo Actualizado!'         
          });
          this.router.navigate(['/home/series']);
        }     
      }
    });   
  }
}
