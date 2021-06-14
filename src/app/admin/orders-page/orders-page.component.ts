import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {

  orders: Order[] = []
  psub: Subscription
  dSub: Subscription

  constructor(
    private orderServ: OrderService
  ) { }

  ngOnInit(): void {
    this.psub = this.orderServ.getAll().subscribe(orders=>{
      this.orders = orders
    })
  }

  remove(id: string){
    this.dSub = this.orderServ.remove(id).subscribe(()=>{
      this.orders = this.orders.filter(order=> order.id !== id)
    })
  }

  ngOnDestroy(){
    if(this.psub){
      this.psub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }
  }

}
