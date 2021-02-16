import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MovieComponent } from './movie/movie.component';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PerfilComponent,
    MovieComponent,
    PagesComponent,
    UsuariosComponent],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule, SharedModule, RouterModule, ReactiveFormsModule
  ]
})
export class PagesModule { }
