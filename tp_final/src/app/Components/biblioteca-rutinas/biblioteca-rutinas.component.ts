import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Lista } from 'src/app/Models/lista';
import { JSONService } from 'src/app/services/JSON/json.service';

import { LoginService } from 'src/app/services/auth/login.service';
import { Subscription } from 'rxjs';

import { Rutina } from 'src/app/Models/rutina';

@Component({
  selector: 'app-biblioteca-rutinas',
  templateUrl: './biblioteca-rutinas.component.html',
  styleUrls: ['./biblioteca-rutinas.component.css'],
})
export class BibliotecaRutinasComponent implements OnInit {
  protected user: Usuario = new Usuario();
  protected rutinaActual?: Lista;
  protected mostrarEditar: boolean = false;
  protected mostrarVer: boolean = false;

  loggedInStatus!: Number;
  subcripcion!: Subscription;
  //userLogged!: Usuario;

  constructor(
    private servicioUsuario: UsuarioService,
    private jsonService: JSONService,
    private loginService: LoginService
  ) {}
  filterPost = '';

  @ViewChild('lista') lista!: ElementRef;
  @ViewChild('popupItem') popupItem!: ElementRef;

  ngOnInit(): void {
    this.loginService.getisLoggedIn().subscribe((value) => {
      this.loggedInStatus = value;
      if (this.loggedInStatus != -1) {
        this.getUser();
      } else {
        console.log('nada');
      }
    });

    this.subcripcion = this.jsonService.refresh$.subscribe(() => {
      this.getUser();
    });
  }

  getUser() {
    this.jsonService.getUserByID(this.loggedInStatus).subscribe((user) => {
      this.user = user;
      console.log(user)
    });
  }

  mostrarRutina(rutina: Lista) {
    console.log(rutina);
    this.mostrarVer=!this.mostrarVer;
    this.rutinaActual = rutina;
  }

  modificarMostrarVer(){
    this.mostrarVer=!this.mostrarVer;
  }



  nombreListaActualizar(nombre: string) {
    const usuarioActualizado: Usuario = {
      ...this.user,
      bibliotecaRutinas: { ...this.user.bibliotecaRutinas, nombre: nombre },
    };
    this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
    });
  }

  descripcionListaActualizar(descripcion: string) {
    const usuarioActualizado: Usuario = {
      ...this.user,
      bibliotecaRutinas: {
        ...this.user.bibliotecaRutinas,
        descripcion: descripcion,
      },
    };
    this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
    });
  }

  modificarMostrarEditar() {
    this.mostrarEditar = !this.mostrarEditar;
  }

  eliminarRutina(rutina: Lista) {
    //console.log("rutina entrante" , rutina)
    //console.log("antes de",this.user.bibliotecaRutinas.listaRutinas);
    var index = this.user.bibliotecaRutinas.listaRutinas.indexOf(rutina);
    if (index !== -1) {
      this.user.bibliotecaRutinas.listaRutinas.splice(index, 1);

      this.jsonService.putUser(this.user).subscribe((response) => {
        const lista: Lista={
          nombre: '',
          texto: '',
        }
        this.rutinaActual=lista;
      });
    }
  }
}
