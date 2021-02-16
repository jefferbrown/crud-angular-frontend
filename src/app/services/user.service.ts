import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import Swal from 'sweetalert2'
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get uid(): string {
    return this.user.id || '';
  }
  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'Authorization': this.token
      }
    }).pipe(
      map((resp: any) => {

        const { name, subname, email, img = '', _id } = resp.usuario;
        this.user = new User(name, subname, email, '', img, _id);
        localStorage.setItem('token', resp.token)
        console.log(resp);

        return true;
      }),
      catchError((error: any) => {
        console.log(error);
        Swal.fire('Error', error.error.msg, 'error')
        return of(false)

      })
    );
  }

  newUser(formData: RegisterForm) {

    return this.http.post(`${base_url}/users/new`, formData)
  }

  actualizarPerfil(data: { email: string, name: string, subname: string }) {
    return this.http.put(`${base_url}/users/${this.user.id}`, data, {
      headers: {
        'Authorization': this.token
      }
    })
  }

  login(loginForm: LoginForm) {
    return this.http.post(`${base_url}/auth/login`, loginForm).pipe(tap((resp: any) => {
      console.log(resp);

      if (resp.token) {
        localStorage.setItem('token', resp.token)
      }

    }))
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }
  /* instanciamos al model */
  cargarUsers(desde: number = 0) {
    const url = `${base_url}/users?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, {
      headers: {
        'Authorization': this.token
      }
    }).pipe(
      map(resp => {
        console.log(resp);

        const usuarios = resp.usuarios.map(
          (user: any) => new User(user.name, user.subname, user.email, '', user.img, user._id,)
        );
        return {
          total: resp.total,
          usuarios
        };
      })
    )

  }

  eliminarUsuario(usuario: User) {
    console.log(usuario);


    // /usuarios/5eff3c5054f5efec174e9c84
    const url = `${base_url}/users/${usuario.id}`;
    return this.http.delete(url, {
      headers: {
        'Authorization': this.token
      }
    });
  }
}
