import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PayuService {

  constructor(private http:HttpClient) {

   }

   pagar(data){

    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    let url= 'https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu';

    return this.http.post(url, params);
   }
}
