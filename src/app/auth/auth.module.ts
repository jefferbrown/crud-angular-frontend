import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  /* declarations: con los componentes, u otros artefactos que este module construye. */
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  /* imports: con los imports que este módulo necesita */
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ]
})
export class AuthModule { }
