import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JSONService } from 'src/app/services/JSON/json.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})
export class RegistroUsuarioComponent implements OnInit {
  userList: Usuario[] = [];
  userName: string = '';
  userLastname: string = '';
  userEmail: string = '';
  userPass: string = '';
  suscription = new Subscription();

  constructor(
    private servicioUsuario: UsuarioService,
    private jsonService: JSONService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.suscription = this.jsonService.refresh$.subscribe(() => {
      this.getUsers();
    });
  }

  getUsers() {
    this.jsonService.getAll().subscribe((data: Usuario[]) => {
      this.userList = data.filter((item: Usuario) => item.baja !== 1);
      console.log(this.userList);
    });
  }

  addUser() {
    let user = new Usuario();
    user.name = this.userName;
    user.lastName = this.userLastname;
    user.email = this.userEmail;
    user.passWord = this.userPass;
    this.servicioUsuario.add(user);
  }
}
