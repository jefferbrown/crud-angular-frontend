import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MovieComponent } from './movie/movie.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },

  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'movies',
    component: MovieComponent,
  },
  {
    path: 'users',
    component: UsuariosComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule { }
