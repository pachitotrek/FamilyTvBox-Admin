import { Injectable, EventEmitter } from '@angular/core';
import { Global } from './global';



@Injectable()
export class UploadService {
  notificacion = new EventEmitter<any>();
 

  constructor() { 

  }

  subirArchivo(archivo:File,tipo:string,id:string){

    return new Promise((resolve,reject)=>{
      const formData:FormData = new FormData();
      let xhr = new XMLHttpRequest();

     

     
      formData.append('archivo',archivo);
      var data = { 'content': formData };    
      console.log(archivo);

      xhr.onreadystatechange= function(){  

        if ( xhr.readyState === 4 ) {


          if ( xhr.status === 200 ) {           
                         
            resolve( JSON.parse( xhr.response ) );   

          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }
        }
      };


      let url = Global.url+ 'upload/' + tipo + '/' + id;

      xhr.open('PUT',url,true);
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       
      xhr.send(formData);

    });
  
  }
}
