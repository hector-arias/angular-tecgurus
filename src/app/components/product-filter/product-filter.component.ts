import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category:any;
  @Output() idCategoria: EventEmitter<number> = new EventEmitter();
  constructor(
    private productService: ProductService,
    private tokenStorageService: TokenStorageService
  ) {
      const token = this.tokenStorageService.getToken()
      this.categories$ = this.productService.getCategories(token);
  }

  public filtrar(idCategoria: number){
      this.idCategoria.emit(idCategoria);
  }

  // private getCategories(){
  //    this.categories$ = this.productService.getCategories(token);
  //    console.log('this.categories$', this.categories$)
  // }

}
