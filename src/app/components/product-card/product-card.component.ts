import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product!: Product;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private toastrService: ToastrService
  ) { }

  public addCart(){
    this.shoppingCartService.addToCart(this.product);
    this.toastrService.success('Producto agregado OK', 'Prodcutos');
  }

}
