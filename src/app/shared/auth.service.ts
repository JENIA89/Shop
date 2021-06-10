import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from './interfaces';
import { environment } from 'src/environments/environment';
import {catchError, tap} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User){
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken)
    )
  }

  private setToken(response: any){
    if(response){
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expDate.toString())
      localStorage.setItem('fb-token', response.idToken)
    }else{
      localStorage.clear()
    }
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if(new Date() > expDate){
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  isAuth():boolean {
    return !!this.token
  }

  logout(){
    this.setToken(null)
  }

}
