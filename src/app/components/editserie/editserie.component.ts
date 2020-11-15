import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editserie',
  templateUrl: './editserie.component.html',
  styleUrls: ['./editserie.component.scss']
})
export class EditserieComponent implements OnInit {

  @ViewChild('modalupload') modalupload: ModalDirective;
  contenido: FormGroup;
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
  id: any;


  constructor(private api: ApiService, private upload: UploadService,private route:ActivatedRoute,private router:Router) {
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


    this.getCategorias();
  }

  ngOnInit() {
    this.id= this.route.snapshot.paramMap.get("id"); 
    this.Videos(this.id);
  }


  Videos(id) {
    this.api.getSerie(id).subscribe((resp: any) => {
      this.videos = resp.results[0];
      console.log(this.videos);
      this.selectVideo(this.videos);
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
            Swal.fire({
              type: 'success',
              title: 'Contenido Actualizado',
              text: 'Haz actualizado un nuevo contenido!'
            })
            this.router.navigate(['/home']);

          }).catch((error) => {  
            console.log("error en la carga");
          });
        }else{
          this.contenido.reset();   
          this.ImagenTemp = "";
          this.modalupload.hide();
          this.imgTemp="";   
          Swal.fire({
            type: 'success',
            title: 'Contenido Actualizado',
            text: 'Haz actualizado un nuevo contenido!'
          })  
          this.router.navigate(['/home']); 
        }    
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

  uploadServidor(event) {
    console.log(event.value);
    if (event.value == 3) {
      this.local_servidor = true;
    } else {
      this.local_servidor = false;
    }
  }




}
