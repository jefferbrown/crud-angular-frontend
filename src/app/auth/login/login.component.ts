import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'
  ]
})
export class LoginComponent {

  /* Para saber si se emvio el formulario */
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],

  })

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }


  login() {
    this.formSubmitted = true;
    console.log(this.loginForm.value);

    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value).subscribe(resp => {


      if (resp.token && resp.message) {
        this.router.navigateByUrl('/')
        Swal.fire('Success', resp.message, 'success')
      }
      if (!resp.token && resp.message) {
        Swal.fire('Error', resp.message, 'error')
      }

    }, (err) => {
      console.log(err);


    }
    )
  }
  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

}
