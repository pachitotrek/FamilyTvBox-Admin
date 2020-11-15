import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Global } from '../../services/global';
import { UploadService } from 'src/app/services/upload.service';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  providers: [ApiService, UploadService]
})
export class VideosComponent implements OnInit {
  @ViewChild('modalupload') modalupload: ModalDirective;
  contenido: FormGroup;
  categoria: FormGroup;
  resultId: string;
  archivo: File;
  videomedia: File;
  local_servidor: boolean = false;
  url: string;
  videos: any = [];
  categorias: any = [];
  imgTemp: any;
  ImagenTemp: string;
  imagensubir: File;
  videosubir: File;
  VideoTemp: string;


  constructor(private api: ApiService, private upload: UploadService) {
    this.url = Global.url;
    this.contenido = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      precio: new FormControl(null, Validators.required),
      url: new FormControl(null),
      categoria: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      disponible: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      servidor: new FormControl(null, Validators.required),
      cantidad: new FormControl(1),
      imagen: new FormControl(null, Validators.required),

    });
    this.categoria = new FormGroup({
      id: new FormControl(null),
      categoria: new FormControl(null, Validators.required)
    });

    this.Videos();
    this.getCategorias();
  }

  ngOnInit() {
  }

  agregarVideo() {
    this.modalupload.show();
    this.api.agregarVideo(this.contenido.value).subscribe((resp: any) => {

      if (resp.ok == true) {
        this.resultId = resp.results;
        let contenido = "videos";
        this.upload.subirArchivo(this.imagensubir, contenido, this.resultId).then((resp: any) => {
          if (this.videosubir) {
            let server = "servidor";
            this.upload.subirArchivo(this.videosubir, server, this.resultId).then((resp: any) => {
              this.upload.notificacion.emit(resp);
              this.ImagenTemp = "";
              this.videosubir=null;              
              this.modalupload.hide();
              this.contenido.reset();
              Swal.fire({
                type: 'success',
                title: 'Contenido Agregado',
                text: 'Haz creado un nuevo contenido!'
              });              
            }).catch((error) => {
              console.log(error);
              console.log("error en la carga del video");
            });
          }else{
            this.upload.notificacion.emit(resp);
            this.ImagenTemp = "";
            this.modalupload.hide();
            this.contenido.reset();   
            Swal.fire({
              type: 'success',
              title: 'Contenido Agregado',
              text: 'Haz creado un nuevo contenido!'
            })    
          } 
          
          this.videos();

        }).catch((error) => {
          console.log("error en la carga");
        });



      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }

    });



  }
  Videos() {
    this.api.getVideos().subscribe((resp: any) => {
      this.videos = resp;
    });
  }
  selectVideo(item) {
    this.imgTemp = item.imagen;
    this.contenido.setValue(item);
  }
  actualizarVideo() {
    this.modalupload.show();

    this.api.actualizarVideo(this.contenido.value).subscribe((resp: any) => {
      if (resp.ok == true) {
        this.resultId = this.contenido.value.id;
        let word = "videos";
        if(this.imagensubir){
          this.upload.subirArchivo(this.imagensubir, word, this.resultId).then((resp: any) => {
            this.upload.notificacion.emit(resp);
            this.ImagenTemp = "";
            this.modalupload.hide();
            this.contenido.reset();
            this.Videos();
          }).catch((error) => {
  
            console.log("error en la carga");
          });
        }else{
          this.contenido.reset();   
          this.ImagenTemp = "";
          this.modalupload.hide();
          this.imgTemp="";
          this.Videos();
          Swal.fire({
            type: 'success',
            title: 'Contenido Actualizado',
            text: 'Haz actualizado un nuevo contenido!'
          })    

        }    


      }
    });
  }
  agregarCategoria() {
    this.api.agregarCategoria(this.categoria.value).subscribe((resp: any) => {
      if (resp.ok == true) {
        Swal.fire({
          type: 'success',
          title: 'Exito !!',
          text: 'categoria creada!'
        });
        this.getCategorias();
        this.videos();
      }
    });
  }
  getCategorias() {
    this.api.getCategorias().subscribe(resp => {
      this.categorias = resp;
    })
  }
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.archivo = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Solo se aceptan Imagenes!'
      })
    }

    this.imagensubir = archivo;
    let reader = new FileReader();
    let UrlImageTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.ImagenTemp = reader.result.toString();
  }
  seleccionarVideo(archivo: File) {
    if (!archivo) {
      this.videomedia = null;
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
  editarCategoria() {
    this.api.editarCategoria(this.categoria.value).subscribe((resp: any) => {

      if (resp.ok == true) {
        Swal.fire({
          type: 'success',
          title: 'Exito !!',
          text: 'categoria Actualizada!'
        });
        this.getCategorias();
        this.videos();
      }

    });
  }
  selectCategoria(item) {
    this.categoria.setValue(item);
  }

  uploadServidor(event) {
    console.log(event.value);
    if (event.value == 3) {
      this.local_servidor = true;
    } else {
      this.local_servidor = false;
    }
  }



}
