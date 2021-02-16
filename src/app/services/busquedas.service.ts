import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': this.token
      }
    }
  }

  private transformarUsuarios(resultados: any[]): User[] {

    return resultados.map(
      user => new User(user.name, user.subname, user.email, '', user.img, user._id,)
    );
  }



  buscar(
    tipo: 'users' | 'movies',
    termino: string
  ) {

    const url = `${base_url}/search/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipo) {
            case 'users':
              return this.transformarUsuarios(resp.resultados)


            default:
              return [];
          }

        })
      );

  }
}
