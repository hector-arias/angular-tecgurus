import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url:string;

  constructor(
    private http: HttpClient

  ) {
    this.url = GLOBAL.url;
   }

  login(username: string, password: string){
    let json = JSON.stringify({'username': username, 'password': password});
    let headers = {'Content-Type': 'application/json'};
    return this.http.post(this.url + 'login', json, {headers, responseType: 'text'});
  }
}
