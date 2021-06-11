import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product, fbCreateResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  create(product: Product): Observable<Product>{
    return this.http.post(`${environment.fbDbUrl}/products.json`,product)
    .pipe(
      map((res: fbCreateResponse)=>{
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      })
    )
  }

  getAll(): Observable<Product[]>{
    return this.http.get(`${environment.fbDbUrl}/products.json`)
    .pipe(
      map(res => {
        return Object.keys(res)
        .map(key=>({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }))
      })
    )
  }
}