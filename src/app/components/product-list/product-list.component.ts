import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public products : Product[];
  public filteredProducts: Product[] = [];
  public wordFilter: string = "";

  constructor(
      private tokenService: TokenStorageService,
      private productService: ProductService
  ) {
    this.products = [];
  }

  ngOnInit(): void {
    this.getProductos();
  }

  private getProductos(){
    const token = this.tokenService.getToken();
    this.productService.getProducts(token).subscribe({
       next: result =>  {this.products = result, this.applyFilter(null) },
       error: (e) => console.log(e),
       complete: () => console.info('complete')
      })
  }

  private applyFilter(categoria:any){
    if(categoria == null){
      this.filteredProducts = this.products;
      console.log(' this.filteredProducts',  this.filteredProducts);
    }else{
    this.filteredProducts = this.products.filter(p => p.categoria.idcategoria === categoria)
    }
  }

  filtrarProducto(respuesta: number){
      this.filteredProducts = this.products.filter(p => p.categoria.idcategoria === respuesta);
  }

  //Método que accede al servicio de filtrado de productos
  getProductsList(){
     const token = this.tokenService.getToken();
     this.productService.getProductsFilter(token, this.wordFilter).subscribe({
       next: result => { console.log('getProductsList', result),
       this.products = result; this.applyFilter(null) },
       error: (e) => console.error(e),
       complete: () => console.info('complete')
     })
  }

}
