import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public Administrador: string;
  public isLoggedIn = false;

  /*
  NOTA: Se instancias los servicios en el constructor, de acuerdo a que se vayan a utilizar
  */
  constructor(
    private tokenStorageService : TokenStorageService,
    public shoppingCartService: ShoppingCartService
  ) {
    this.Administrador = 'Administrador';
  }

  ngOnInit(): void {
  }

  /*
  Método utilizado para cierre de sesión de la aplicación
  */
  public logout(): void{
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.Administrador = "";
  }


}
