import { Product } from 'src/app/shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartProducts: Product[]
  totalPrice: number = 0
  form: FormGroup
  isSubmitted: boolean = false
  sent: string = ''


  constructor(
    private productServ: ProductService,
    private orderServ: OrderService

  ) { }

  ngOnInit(): void {
   this.cartProducts = this.productServ.cartProducts
   this.totalPrice = this.cartProducts.reduce((initValue, cartProduct)=> (initValue +  +cartProduct.price),this.totalPrice);
   this.initForm()
  }

  initForm(){
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash')
    })
  }

  submit(){
    if(this.form.invalid) return

    this.isSubmitted = true

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()
  }

  this.orderServ.create(order).subscribe(()=>{
    this.form.reset()
    this.sent = 'Deliveri is framed'
    this.isSubmitted = false
  })
}

 delete(product: Product){
   this.totalPrice -= +product.price
   this.cartProducts = this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
 }

}
