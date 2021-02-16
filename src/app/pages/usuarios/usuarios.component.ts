import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: User[] = []
  public usuariosTemp: User[] = [];
  public cargando: boolean = true;
  public desde: number = 0;

  constructor(private userService: UserService, private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this.userService.cargarUsers(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;

      this.usuariosTemp = usuarios;
      this.cargando = false;


    })
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('users', termino)
      .subscribe((resp: User[]) => {

        this.usuarios = resp;

      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  eliminarUsuario(usuario: User) {

    if (usuario.id === this.userService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.id}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        console.log(result);
        this.userService.eliminarUsuario(usuario)
          .subscribe(resp => {

            console.log(resp);

            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${usuario.name} fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

}
