import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  products: Product[] = []
  psub: Subscription
  dSub: Subscription
  productName: string = ''
  constructor(private productServ: ProductService) { }

  ngOnInit(): void {
    this.psub = this.productServ.getAll().subscribe(product=>{
      this.products = product
    })
  }

  remove(id: string){
    this.dSub = this.productServ.remove(id).subscribe(()=>{
      this.products = this.products.filter(product=> product.id !== id)
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
