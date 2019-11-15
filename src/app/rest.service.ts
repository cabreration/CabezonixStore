import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

 /* Esta direccion debe ser cambiada por la direccion que vamos a utilizar */
const baseAddress = 'https://localhost:44355/api/values';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  GetRequest() {
    return this.httpClient.get(baseAddress, httpOptions);
  }

  PostRequest(factura) {
    return this.httpClient.post(baseAddress, { factura: factura }, httpOptions);
  }

  SendMessage(message: string) {
    return this.httpClient.post(baseAddress, { mensaje: message }, httpOptions);
  }
}
