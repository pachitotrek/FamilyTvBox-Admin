import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';
import 'rxjs/add/operator/map';
import { UploadService } from './upload.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url: String;
  public notificacion = new EventEmitter<any>();

  constructor(private http: HttpClient, public uploadService: UploadService) {
    this.url = Global.url;
  }

  //Seccion de Emisoras y Canales de Tv
  agregarRecurso(data): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url + "contenido", params, { headers: headers });
  }
  editarRecurso(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url + "contenido", params, { headers: headers });
  }
  eliminarRecurso(data): Observable<any> {
    let params = JSON.stringify({ "id": data });
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url + "dcontenido", params, { headers: headers });
  }
  getContenido(): Observable<any> {

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url + "estacion", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }
  agregarIdioma(data): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url + "idiomas", params, { headers: headers });
  }
  getIdiomas(): Observable<any> {

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url + "idiomas", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }
  editarIdioma(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.url + "idiomas", params, { headers: headers });
  }
  eliminarIdioma(data): Observable<any> {
    let params = JSON.stringify({ "id": data });
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url + "didiomas", params, { headers: headers });
  }
  agregarGenero(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + "genero", params, { headers: headers });
  }
  getGeneros(): Observable<any> {

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url + "genero", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }
  editarGenero(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.url + "genero", params, { headers: headers });
  }
  eliminarGenero(data): Observable<any> {
    let params = JSON.stringify({ "id": data });
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url + "dgenero", params, { headers: headers });
  }

  //CUPONES
  addCupon(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + "cupon", params, { headers: headers });
  }
  editCupon(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + "ecupon", params, { headers: headers });
  }
  getCupon(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "cupon", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }


  //Seccion de Publicidad
  agregarPublicidad(data): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url + "publicidad", params, { headers: headers });
  }
  editarPublicidad(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.url + "publicidad", params, { headers: headers });
  }
  eliminarPublicidad(data): Observable<any> {
    let params = JSON.stringify({ "id": data });
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url + "dpublicidad", params, { headers: headers });
  }
  getPublicidad(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "publicidad", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }

  //Seccion de Tienda
  agregarProducto(data): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url + "producto", params, { headers: headers });
  }
  actualizarProducto(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.url + "producto", params, { headers: headers });
  }
  eliminarProducto(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.url + "bproducto", params, { headers: headers });
  }
  getProductos(): Observable<any> {

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url + "allproductos", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }
  agregarPCategoria(data): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url + "pcategoria", params, { headers: headers });
  }
  editarPCategoria(data): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url + "pcategoria", params, { headers: headers });
  }
  getPCategorias(): Observable<any> {

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url + "pcategorias", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }
  eliminarPCategorias(data): Observable<any> {
    let params = JSON.stringify({ "id": data });
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.put(this.url + "borrarpcategorias", params, { headers: headers });
  }


  //Seccion Videos a la carta
  agregarVideo(data): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url + "addvideo", params, { headers: headers });
  }
  getVideos(): Observable<any> {

    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.get(this.url + "videos", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }
  getSeries(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "series", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }
  agregarCapitulo(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + "serie", params, { headers: headers });
  }
  getCapitulos(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "serie/" + id, { headers: headers });
  }

  getSerieId(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "serieid/" + id, { headers: headers });
  }
  actualizarVideo(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.url + "editvideo", params, { headers: headers });
  }
  actualizarSerie(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + "editarserie", params, { headers: headers });
  }
  EditarSerie(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.url + "editars", params, { headers: headers });
  }
  getSerie(id): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "getserie/" + id, { headers: headers });
  }


  agregarCategoria(data): Observable<any> {

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.post(this.url + "categoria", params, { headers: headers });
  }
  editarCategoria(data): Observable<any> {
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.url + "categoria", params, { headers: headers });
  }
  getCategorias(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "categorias", { headers: headers }).map(
      (resp: any) => resp.results
    );
  }


  //Imagen
  subirImagen(archivo: File, key: string, id: string) {

    this.uploadService.subirArchivo(archivo, key, id)
      .then((resp: any) => {

        console.log(resp);

        return Swal.fire({
          type: 'success',
          title: 'Contenido Agregado',
          text: 'Has agregado el nuevo contenido!'

        });

      }).catch(resp => {
        console.log(resp);
      })

  }










}
