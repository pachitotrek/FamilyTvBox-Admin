import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import {Global} from '../../services/global';
import { UploadService } from 'src/app/services/upload.service';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss'],
  providers:[ApiService,UploadService]
})
export class ContenidoComponent implements OnInit {
  @ViewChild('modalupload') modalupload: ModalDirective;
  contenido:FormGroup;
  idioma:FormGroup;
  genero:FormGroup;
  generos:any=[];
  resultId:string;
  imagensubir:File;
  url:string;
  idiomas:any=[];
  items:any=[];
  imgTemp:string;
  ImagenTemp:string

  constructor(private api:ApiService,private upload:UploadService) { 
    this.url=Global.url;
    this.contenido = new FormGroup({
      id:new FormControl(null),
      name: new FormControl(null,Validators.required),
      url: new FormControl(null,Validators.required),
      tipo:new FormControl(null,Validators.required),
      genero:new FormControl(null,Validators.required),
      imagen:new FormControl(null),
      idioma:new FormControl(null,Validators.required)      
    });
    this.idioma= new FormGroup({
      id: new FormControl(null),
      idioma:new FormControl(null,Validators.required)
    });
    this.genero= new FormGroup({
      id: new FormControl(null),
      genero:new FormControl(null,Validators.required)
    });

    this.getContenido();
    this.getIdiomas();
    this.getGeneros();
  }

  ngOnInit() {
  }

  agregarContenido(){
    this.modalupload.show();
    this.api.agregarRecurso(this.contenido.value).subscribe((resp:any)=>{     
      if(resp.ok==true){
        
       this.resultId=resp.results;
       let contenido="contenido"  
       
       this.upload.subirArchivo(this.imagensubir,contenido,this.resultId).then((resp:any)=>{


         this.upload.notificacion.emit(resp);
         this.ImagenTemp="";
         this.modalupload.hide();
         this.contenido.reset();
         this.getContenido();
        

       }).catch((error)=>{

        console.log("error en la carga");



       });

      //  this.api.subirImagen(this.imagensubir,contenido,this.resultId);

      }else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'         
        })
      }

      // setTimeout(() => {
      //     this.getContenido();
      // }, 1000);

     ;
    
    });  

  }
  editarContenido(item){
    this.imgTemp=item.imagen
    this.contenido.setValue(item);
  }
  actualizar(){    
 this.modalupload.show();
    this.api.editarRecurso(this.contenido.value).subscribe((resp:any)=>{
      if(resp.ok==true){
        let id = this.contenido.value.id
        this.resultId=id;
        let contenido="contenido";
        if(this.imagensubir){
          this.upload.subirArchivo(this.imagensubir,contenido,this.resultId).then((resp:any)=>{
            this.upload.notificacion.emit(resp);
            this.ImagenTemp="";
            this.modalupload.hide();
            this.contenido.reset();
            this.getContenido();
            Swal.fire({
              type: 'success',
              title: 'Exito !!',
              text: 'Haz Actualizado el contenido!'         
            })        
          }).catch((error)=>{ 
           console.log("error en la carga"); 
          }); 
        }else{
          this.modalupload.hide();
          this.contenido.reset();
          this.getContenido(); 
          Swal.fire({
            type: 'success',
            title: 'Exito !!',
            text: 'Haz Actualizado el contenido!'         
          })     
        }      
      
      }else{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'         
        })
      }
    });
  }
  eliminarContenido(id){
    this.api.eliminarRecurso(id).subscribe((resp:any)=>{

      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Exito',
          text: 'Recurso Eliminado!'         
        })        
        this.getContenido();
        this.getIdiomas();
        

      }

    });

  }
  getContenido(){
    this.api.getContenido().subscribe((resp:any)=>{     
      this.items= resp;    
      console.log(this.items);    
    });
  }
  seleccionImagen(archivo:File){

    if(!archivo){
      this.imagensubir=null;
      return;
    }

    if(archivo.type.indexOf('image')<0){
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Solo se aceptan Imagenes!'         
      })
    }  

    this.imagensubir=archivo;    

    let reader = new FileReader();
    let UrlImageTemp = reader.readAsDataURL(archivo);

    reader.onloadend=()=>this.ImagenTemp=reader.result.toString();
 

    
  }
  agregarIdioma(){
    this.api.agregarIdioma(this.idioma.value).subscribe((resp:any)=>{

      if(resp){
        Swal.fire({
          type: 'success',
          title: 'Idioma agregado',
          text: 'Has agregado un idioma!'
        });

        this.getContenido();
        this.getIdiomas();
      }     

    });
  }
  agregarGenero(){
    this.api.agregarGenero(this.genero.value).subscribe((resp:any)=>{

      if(resp){
        
        Swal.fire({
          type: 'success',
          title: 'Genero agregado',
          text: 'Has agregado un nuevo Genero!'
        });

        this.getContenido();
        this.getIdiomas();
        this.genero.reset();
      }     

    });
  }
  getGeneros(){
    this.api.getGeneros().subscribe(resp=>{
      this.generos=resp;
    })
  }
  editarGeneross(a){
    this.genero.setValue(a);
  }
  eliminarGenero(id){
    this.api.eliminarGenero(id).subscribe((resp:any)=>{
      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Exito',
          text: 'Recurso Eliminado!'         
        })        
        this.getContenido();
        this.getIdiomas();

      }

    });

  }
  GenerosA(){
    this.api.editarGenero(this.genero.value).subscribe((resp:any)=>{

      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Exito !!',
          text: 'Idioma Actualizado!'         
        })

        this.getContenido();
        this.getIdiomas();
        this.getGeneros();

      }

    });
    
  }

  getIdiomas(){
    this.api.getIdiomas().subscribe(resp=>{
      this.idiomas=resp;
    })
  }
  editarIdiomas(a){
    this.idioma.setValue(a);
  }
  Idiomas(){
    this.api.editarIdioma(this.idioma.value).subscribe((resp:any)=>{

      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Exito !!',
          text: 'Idioma Actualizado!'         
        })

        this.getContenido();
        this.getIdiomas();

      }

    });
    
  }
  eliminarIdioma(id){
    this.api.eliminarIdioma(id).subscribe((resp:any)=>{
      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Exito',
          text: 'Recurso Eliminado!'         
        })        
        this.getContenido();
        this.getIdiomas();

      }

    });

  }


}
