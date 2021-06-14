import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  type: string 

  constructor(
    private router: Router,
    public productServ: ProductService
  ) { }

  ngOnInit(): void {
  }

  setType(type: string){
    this.type = type

    if(this.type !== 'cart'){
      this.router.navigate(['/'],{
        queryParams:{
          type: this.type
        }
      })
    }

    this.productServ.setType(this.type)
  }

}
