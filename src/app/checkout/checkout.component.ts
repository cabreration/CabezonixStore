import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';


declare const algo:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  private amount;
  private shopCart = [];
  private products = [];
  private total = 0;
  private productsList = [];

  public nombre = "";
  public apellidos = "";
  public correoElectronico = "";
  public direccion = "";
  public nombreTarjeta = "";
  public numeroTarjeta = "";
  public expiracion = "";
  public cvv = "";


  constructor(private rest: RestService) {
    this.nombre = "";
    this.apellidos = "";
    this.correoElectronico = "";
    this.direccion = "";
    this.nombreTarjeta = "";
    this.numeroTarjeta = "";
    this.expiracion = "";
    this.cvv = "";
    let info = JSON.parse(localStorage.getItem('cart'));
    this.amount = info.amount;
    this.shopCart = info.cart;
    this.total = 0;
    const observer = this.rest.GetRequest().subscribe(res => {
      this.productsList = res.message;
      this.filter();
      this.getTotal();
      observer.unsubscribe();  
      /*-------------------> Aqui se debe procesar el resultado de la consulta,
       la consulta debe retornar la lista de todos los productos que estan en la base de datos
    */});
    
   }

  ngOnInit() {
  }

  // este metodo filtra los productos para ponerlos en la factura
  //--------> no lo he probado todavia
  filter(): void {
    this.productsList.forEach(element => {
      let flag = false;
      this.shopCart.forEach(funko => {
        if (funko === element.id) {
          if (!flag) {
            this.products.push({id: funko, nombre: element.nombre, descripcion: element.descripcion, precio: element.precio, cantidad: 1});
            flag = true;
          }
          else {
            this.products.forEach(prod => {
              if (prod.id === funko) {
                prod.cantidad++;
              }
            });
          }
        }
      });
    });
  }

  getTotal(): void {
    this.products.forEach(element => {
        this.total += element.precio * element.cantidad;
    });
  }

  mailTicket(): void {
    if (this.nombre === ""
        || this.apellidos === ""
        || this.correoElectronico === ""
        || this.direccion === ""
        || this.nombreTarjeta === ""
        || this.numeroTarjeta === ""
        || this.expiracion === ""
        || this.cvv === ""
        || this.shopCart.length === 0) {
          alert('Todos los campos son obligatorios para poder realizar la compra');
          return;
        }
    const factura = { nombre: this.nombre,
                      apellidos: this.apellidos,
                      correoElectronico: this.correoElectronico,
                      direccion: this.direccion,
                      nombreTarjeta: this.nombreTarjeta,
                      numeroTarjeta: this.numeroTarjeta,
                      expiracion: this.expiracion,
                      cvv: this.cvv,
                      carrito: this.shopCart };

    const observer = this.rest.PostRequest(factura).subscribe(res => {
      let resp = res;
      console.log(resp);
      observer.unsubscribe(); 
    });
    
  }

}
