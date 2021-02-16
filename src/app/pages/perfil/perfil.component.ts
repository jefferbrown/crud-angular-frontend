import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup
  public user: User
  constructor(private userService: UserService, private fb: FormBuilder) {
    this.user = userService.user
  }
  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      name: [this.user.name, Validators.required],
      subname: [this.user.subname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });

  }

  actualizarPerfil() {
    this.userService.actualizarPerfil(this.perfilForm.value).subscribe(resp => {
      const { name, subname, email } = this.perfilForm.value;
      this.user.name = name;
      this.user.subname = subname;
      this.user.email = email;
      console.log(resp);
      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.message, 'error');
    })
  }

}
