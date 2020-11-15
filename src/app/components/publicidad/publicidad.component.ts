import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import {Global} from '../../services/global';
import { UploadService } from 'src/app/services/upload.service';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss'],
  providers:[ApiService,UploadService]
})
export class PublicidadComponent implements OnInit {
  @ViewChild('modalupload') modalupload: ModalDirective;
  contenido:FormGroup;
  resultId:string;
  imagensubir:File;
  url:string;
  items:any=[];  
  ImagenTemp: string;
  imgTemp: any;

  constructor(private api:ApiService,private upload:UploadService) { 
    this.url=Global.url;
    this.contenido = new FormGroup({
      id:new FormControl(null),
      name: new FormControl(null,Validators.required),     
      tipo:new FormControl(null,Validators.required),
      publico:new FormControl(null,Validators.required),
      state:new FormControl(null),
      archivo:new FormControl(null)
    });
    this.getPublicidad();
  }

  ngOnInit() {
  }

  agregarContenido(){
    this.modalupload.show();
    this.api.agregarPublicidad(this.contenido.value).subscribe((resp:any)=>{
      if(resp.ok==true){       
       this.resultId=resp.results;
       let contenido="publicidad";

       this.upload.subirArchivo(this.imagensubir,contenido,this.resultId).then((resp:any)=>{


        this.upload.notificacion.emit(resp);
        this.ImagenTemp="";
        this.modalupload.hide();
        this.contenido.reset();
        this.getPublicidad();
        Swal.fire({
          type: 'success',
          title: 'Exito',
          text: 'Recurso agregado!'         
        })      
      }).catch((error)=>{

       console.log("error en la carga");
      });



       
      }else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'         
        })
      }
    });
  }
  editar(item){
    this.imgTemp=item.archivo;
    this.contenido.setValue(item);
  }
  actualizar(){
    if(this.imagensubir){
      this.modalupload.show();
      this.api.editarPublicidad(this.contenido.value).subscribe((resp:any)=>{
        if(resp.ok==true){       
          this.resultId=this.contenido.value.id;
          let contenido="publicidad";
          this.upload.subirArchivo(this.imagensubir,contenido,this.resultId).then((resp:any)=>{
  
            this.upload.notificacion.emit(resp);
            this.ImagenTemp="";
            this.modalupload.hide();
            this.contenido.reset();
            this.getPublicidad();
            Swal.fire({
              type: 'success',
              title: 'Exito',
              text: 'Se ha actualizado!'         
            })
          }).catch((error)=>{    
           console.log("error en la carga");
          });  
         }else{
           
         }
      });

    }else{
      this.api.editarPublicidad(this.contenido.value).subscribe((resp:any)=>{
        if(resp.ok==true){ 
          this.getPublicidad();
          this.contenido.reset();
          Swal.fire({
            type: 'success',
            title: 'Exito',
            text: 'Se ha actualizado!'         
          })     
        
         }else{
           
         }
      });
    }
  
  }
 
  getPublicidad(){
    this.api.getPublicidad().subscribe((resp:any)=>{
    this.items= resp;
    console.log(this.items);       
    
    });
  }
  seleccionImagen(archivo:File){

    if(!archivo){
      this.imagensubir=null;
      return;
    }

    console.log(archivo);

    if(archivo.type.indexOf('image')<0 && archivo.type.indexOf('video')){
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Solo se aceptan Imagenes o Videos!'         
      })
    }   

    let reader = new FileReader();
    let UrlImageTemp = reader.readAsDataURL(archivo);

    reader.onloadend=()=>this.ImagenTemp=reader.result.toString();
    this.imagensubir=archivo;   

    
  }
  eliminarIdioma(id){
    this.api.eliminarPublicidad(id).subscribe((resp:any)=>{
      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Exito',
          text: 'Recurso Eliminado!'         
        })        
        this.getPublicidad();      

      }

    });

  }



}
