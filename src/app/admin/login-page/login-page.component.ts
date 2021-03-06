import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  isSubmitted = false
  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.initForm()
  }

  initForm(){
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  submit(){
    if(this.form.invalid) return

    this.isSubmitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    this.auth.login(user).subscribe(()=>{
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.isSubmitted = false
    },()=>{
      this.isSubmitted = true
    }
    )
    
  }

}
