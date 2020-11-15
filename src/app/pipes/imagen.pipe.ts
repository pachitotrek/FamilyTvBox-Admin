import { Pipe, PipeTransform } from '@angular/core';
import {Global} from '../services/global';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string,tipo:string ='usuario'): any {

    let url= Global.url+'img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'contenido':
        url += '/contenido/' + img;
      break;

      case 'publicidad':
        url += '/publicidad/' + img;
      break;

      case 'tienda':
         url += '/tienda/' + img;
      break;
      
      case 'videos':
         url += '/videos/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usurios/xxx';
    }



    return url;
  }

}
