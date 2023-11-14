import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { LoginService } from 'src/app/services/auth/login.service';
import { JSONService } from 'src/app/services/JSON/json.service';

@Component({
  selector: 'app-biblioteca-recetas',
  templateUrl: './biblioteca-recetas.component.html',
  styleUrls: ['./biblioteca-recetas.component.css'],
})
export class BibliotecaRecetasComponent implements OnInit {
  loggedInStatus!: Number;
  userLogged!: Usuario;

  constructor(
    private servicioUsuario: UsuarioService,
    private loginService: LoginService,
    private jsonService: JSONService
  ) {}

  @ViewChild('lista') lista!: ElementRef;
  @ViewChild('popupItem') popupItem!: ElementRef;

  ngOnInit(): void {
    this.loginService.getisLoggedIn().subscribe((value) => {
      this.loggedInStatus = value;
      if (this.loggedInStatus != -1) {
        this.jsonService.getUserByID(this.loggedInStatus).subscribe((user) => {
          this.userLogged = user;
          console.log(this.userLogged);
        });
      } else {
        console.log('nada');
      }
    });
  }

  // crearView() {
  //   const log = this.servicioUsuario.checkLoggedIn();
  //   const userList = this.servicioUsuario.getUsers();
  //   console.log(userList);
  //   userList.forEach((item) => {
  //     console.log(item);
  //   })
  // //   user.bibliotecaRecetas.listaRecetas.forEach((receta) => {
  // //     const li = document.createElement('li');
  // //     const btnRemove = document.createElement('button');
  // //     const p = document.createElement('p');
  // //     p.textContent = String(receta.texto);
  // //     li.appendChild(p);
  // //     this.lista.nativeElement.appendChild(li);
  // //   })
  // // }
  // }
}
