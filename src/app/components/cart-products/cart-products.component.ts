import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product.model';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { TokenStorageService } from '../../services/token-storage.service';


@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit {
 public cartProducts: Product[] = [];
 public clients: Client[] = [];

  constructor(
    private shoppingCartService : ShoppingCartService,
    private clientService: ClientService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getClients();
    this.getCartProducts();
  }

  //Método que consulta la lista de productos de la variable local
  private getCartProducts(){
    this.cartProducts = this.shoppingCartService.getLocalCartProducts();
  }

  //Mpetodo que consulta la lista de clientes del market place
  // private getClients(){
  //   const token = this.tokenStorageService.getToken();
  //  this.clientService.getClients(token).subscribe(
  //    result => {
  //       this.clients = result;
  //    },
  //    error =>{
  //      console.log(<any>error);
  //    }
  //  );
  // }
  private getClients(){
    const token = this.tokenStorageService.getToken();
    this.clientService.getClients(token).subscribe({
      next: result => {this.clients = result},
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
    console.log("this.clients", this.clients);
  }

}
