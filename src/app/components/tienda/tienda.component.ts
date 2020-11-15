import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import {Global} from '../../services/global';
import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
  providers:[ApiService]
})
export class TiendaComponent implements OnInit {
  contenido:FormGroup;
  categoria:FormGroup;
  resultId:string;
  archivo:File;
  url:string;
  categorias:any=[];
  items:any=[];
  imgTemp: any;
  ImagenTemp: string;

  constructor(private api:ApiService,private upload:UploadService) {
    this.url=Global.url;
    this.contenido = new FormGroup({
      id:new FormControl(null),      
      name: new FormControl(null,Validators.required),  
      descripcion:new FormControl(null,Validators.required),   
      categoria:new FormControl(null,Validators.required),
      tipo:new FormControl(2),
      precio:new FormControl(null,Validators.required),
      imagen:new FormControl(null,Validators.required), 
      servidor:new FormControl(null), 
      disponible:new FormControl(null,Validators.required),
      cantidad:new FormControl(1),
      time:new FormControl(null),
      url:new FormControl(null),      
    });
    this.categoria= new FormGroup({
      id:new FormControl(null),
      categoria:new FormControl(null,Validators.required)
    });

    this.Productos();
    this.getCategorias();
   }

  ngOnInit() {
  }
  
  agregarProducto(){
    this.api.agregarProducto(this.contenido.value).subscribe((resp:any)=>{

      if(resp.ok==true){
        
       this.resultId=resp.results;

       let contenido="tienda"

       if(this.archivo){
         this.upload.subirArchivo(this.archivo,contenido,this.resultId).then((data:any)=>{
          Swal.fire({
            type: 'success',
            title: 'Exito',
            text: 'Se ha Actualizado!'         
          })
          this.getCategorias();
          this.Productos();
          this.contenido.reset();
          this.archivo=null;
         }).catch((error)=>{
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Error!'         
          })
          this.getCategorias();
          this.Productos();
          this.contenido.reset();
          this.archivo=null;
         });

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

  Productos(){

    this.api.getProductos().subscribe((resp:any)=>{
     
      this.items= resp;       
      console.log(this.items);

    });
  }
  editar(item){
    this.imgTemp=item.imagen;
    this.contenido.setValue(item);
  }
  actualizar(){

    this.api.actualizarProducto(this.contenido.value).subscribe((resp:any)=>{
      if(resp.ok==true){       
        this.resultId=this.contenido.value.id;
        let contenido="tienda" 
        if(this.archivo){
          this.upload.subirArchivo(this.archivo,contenido,this.resultId).then((data:any)=>{
            Swal.fire({
              type: 'success',
              title: 'Exito',
              text: 'Se ha Actualizado!'         
            })
            this.getCategorias();
            this.Productos();
            this.contenido.reset();
            this.archivo=null;
            this.imgTemp="";
            this.ImagenTemp="";
           }).catch((error)=>{
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'Error!'         
            })
            this.getCategorias();
            this.Productos();
            this.contenido.reset();
            this.archivo=null;
           });         

        }else{
          Swal.fire({
            type: 'success',
            title: 'Exito',
            text: 'Se ha Actualizado!'         
          })
          this.getCategorias();
          this.Productos();
          this.contenido.reset();
          this.archivo=null;

        }

          
      
       }else{
         
       }
    });
  }
  eliminar(id){
    this.api.eliminarProducto(id).subscribe((resp:any)=>{
    
      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Exito',
          text: 'Se ha Actualizado!'         
        })
        this.Productos();
      }
    });
  }
  seleccionImagen(archivo:File){

    if(!archivo){
      this.archivo=null;
      return;
    }
 
    if(archivo.type.indexOf('image')<0){
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Solo se aceptan Imagenes!'         
      })
    }   

    let reader = new FileReader();
    let UrlImageTemp = reader.readAsDataURL(archivo);

    reader.onloadend=()=>this.ImagenTemp=reader.result.toString();
    this.archivo=archivo;   


    
  }
  Agregarcategorias(){
    this.api.agregarPCategoria(this.categoria.value).subscribe(resp=>{
      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Exito !!',
          text: 'categoria Creada!'         
        });
        this.getCategorias();
        this.Productos();
      }
    })
  }
  editarCategoria(){
    this.api.editarPCategoria(this.categoria.value).subscribe((resp:any)=>{

      if(resp.ok==true){
        Swal.fire({
          type: 'success',
          title: 'Exito !!',
          text: 'Idioma Actualizado!'         
        });
        this.getCategorias();
        this.Productos();
      }

    });
  }
  selectCategoria(item){
    this.categoria.setValue(item);
  }
  getCategorias(){
    this.api.getPCategorias().subscribe(resp=>{
      this.categorias=resp;
 
    });
  }
  borrar(item){
    this.api.eliminarPCategorias(item).subscribe((resp:any)=>{
        if(resp.ok==true){
          Swal.fire({
            type: 'success',
            title: 'Exito !!'                   
          });
          this.getCategorias();
        }
    });
  }

}
