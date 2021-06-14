import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { fbCreateResponse, Order } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  create(order: Order): Observable<Order>{
    return this.http.post(`${environment.fbDbUrl}/orders.json`, order)
    .pipe(
      map((res: fbCreateResponse)=>{
        return {
          ...order,
          id: res.name,
          date: new Date(order.date)
        }
      })
    )
  }

  getAll(): Observable<Order[]>{
    return this.http.get(`${environment.fbDbUrl}/orders.json`)
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

 
  remove(id: string){
    return this.http.delete(`${environment.fbDbUrl}/orders/${id}.json`)
  }

}
