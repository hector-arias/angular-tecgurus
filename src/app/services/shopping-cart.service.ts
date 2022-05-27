import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  //Método que agrega productos al carro en su variable local
  async addToCart(product: Product){
    const prod: Product[] = JSON.parse(localStorage.getItem("avct_item")!) || [];
    prod.push(product);

    localStorage.setItem("avct_item", JSON.stringify(prod));
  }

  //Método para consultar los prodcutos guardados en la variable local
  getLocalCartProducts(): Product[]{
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item")!) || [];
    return products;
  }

  //Método que elimina un objeto tipo producto del carro de compras
  deleteProductCart(product: Product){
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item")!) || [];
    let indexItem = products.indexOf(product);
    products.splice(indexItem,1)
    localStorage.setItem("avct_item", JSON.stringify(products));
    console.log("Service deleteProductCart", products);
  }
}
