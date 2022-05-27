import { Client } from './../models/client.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public url: string;
  public clients: Client[] = [];

  constructor(
    public _http: HttpClient
  ) {
    this.url = GLOBAL.url;
    this.clients = [{
      idcliente: 1,
      nombre: "Héctor",
      apaterno: "Arias",
      amaterno: "Cueca",
      rfc: "787yuhc98"
    },
    {
      idcliente: 2,
      nombre: "Camilo",
      apaterno: "Arias",
      amaterno: "Cueca",
      rfc: "787yuhc98"
    },
    {
      idcliente: 3,
      nombre: "Alexander",
      apaterno: "Arias",
      amaterno: "Cueca",
      rfc: "787yuhc98"
    },
  ]
  }

  //Método que va retornar la lista de clientes del marketplace
  getClients(token:any):Observable<any>{
    let headers = {'Authorization' : 'Bearer ' + token.toString()}
    return this._http.get(this.url + 'cliente', {headers}).pipe(
      catchError(err => {
        console.log(`En el servicio getClients: ${err.error}`);
        return throwError(err);
      }));
  }

  // getClients(token:any):any{
  //     return this.clients;
  // }
}
