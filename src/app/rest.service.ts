import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './Producto';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

 /* Esta direccion debe ser cambiada por la direccion que vamos a utilizar */
const baseAddress = 'http://192.168.43.194:3000/bd';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  GetRequest():Observable<Producto> {
    return this.httpClient.get<Producto>(baseAddress, httpOptions);
  }

  PostRequest(factura) {
    return this.httpClient.post(baseAddress, { factura: factura }, httpOptions);
  }

  SendMessage(message: string) {
    return this.httpClient.post(baseAddress, { mensaje: message }, httpOptions);
  }
}
