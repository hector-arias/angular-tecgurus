import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
      this.url = GLOBAL.url;
  }

  //Obtener la lista de productos del API
  getProducts(token: any): Observable<any>{
    let headers = {'Authorization': 'Bearer ' + token.toString()};
    return this._http.get(this.url + 'producto', {headers}).pipe(
      catchError(err => {
        console.log(`Error en el servicio: getProducts(): ${err.error}`);
        return throwError(err);
      }));
  }

  //Obtener la lista de categorias asociadas al producto
  getCategories(token:any):Observable<any>{
    let headers = {'Authorization': 'Bearer ' + token.toString()};
    return this._http.get(this.url + 'categoria', {headers});
  }

  //Obtener la lista del inventario del stock de la tienda
  getInventory(token:any):Observable<any>{
   let headers = {'Authorization': 'Bearer ' + token.toString()};
    return this._http.get(this.url + 'compra/inventario', {headers})
  }

  //Obtener lista de prodcutos filtrados por nombre, descripción y sku
  getProductsFilter(token:any, filter: string):Observable<any>{
    let headers = { 'Authorization': 'Bearer ' + token.toString()};
    console.log('filter', filter);
    return this._http.get(this.url + 'producto/busqueda/' + filter, {headers}).pipe(
      catchError(err => {
        console.log(`En el servicio getProductsFilter: ${err.error}`);
        return throwError(err);
      })
    )
  }
}
