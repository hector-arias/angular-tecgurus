import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Inventory } from '../../models/inventory.model';
import { TokenStorageService } from '../../services/token-storage.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  public inventory : Inventory[] =[];
  public sumaVentasTotales: number = 0;
  public sumaCantidadVendidos: number = 0;
  public sumaStock: number = 0;

  constructor(
    private productService: ProductService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
      this.getInventory();
  }

  //Método para consultar el inventario del marketplace con el servicio
  getInventory(){
      const token =  this.tokenStorageService.getToken();
      this.productService.getInventory(token).subscribe(
        result => {
            this.inventory = result;
            this.calcularTotales();
            console.log("this.inventory", this.inventory)
        },
        error => {
          console.log(<any>error);

        }
      )
  }

  //Método para calcular los totales por fila
  private calcularTotales(){
      this.inventory.forEach(element => {
            this.sumaVentasTotales += element.ventastotales;
            this.sumaCantidadVendidos += element.cantidadvendidos;
            this.sumaStock += element.stock;
      })
  }

}
