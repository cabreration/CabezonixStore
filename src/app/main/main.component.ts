import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public shopCart = [];
  public amount = 0;
  public id = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('oninit');
    localStorage.clear();
    this.amount = 0;
  }

  addToCart(id: number): void {
    this.shopCart.push(id);
    this.amount++;
    console.log(this.shopCart);
  }

  sendShopInfo(): void {
    if (this.shopCart.length === 0)
      return;

    localStorage.setItem('cart', JSON.stringify({amount: this.shopCart.length, cart: this.shopCart}));
    this.router.navigate(['pagos']);
  }

}
