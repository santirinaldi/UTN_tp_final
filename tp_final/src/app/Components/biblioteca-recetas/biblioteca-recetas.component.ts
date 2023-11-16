import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Lista } from 'src/app/Models/lista';
import { JSONService } from 'src/app/services/JSON/json.service';

import { LoginService } from 'src/app/services/auth/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-biblioteca-recetas',
  templateUrl: './biblioteca-recetas.component.html',
  styleUrls: ['./biblioteca-recetas.component.css'],
})
export class BibliotecaRecetasComponent implements OnInit {


  filterPost = '';
  protected user: Usuario= new Usuario();
  protected recetaActual?: Lista;
  protected mostrarEditar: boolean=false;

  loggedInStatus!: Number;
  subcripcion!: Subscription;
  userLogged!: Usuario;

  constructor (private servicioUsuario: UsuarioService, private jsonService: JSONService, private loginService: LoginService){}
  
  @ViewChild('lista')lista!:ElementRef;
  @ViewChild('popupItem')popupItem!:ElementRef;
  
  
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
    });
  }

  mostrarReceta(receta: Lista) {
    console.log(receta);
    this.recetaActual=receta;
  }

  nombreListaActualizar(nombre: string){
    const usuarioActualizado: Usuario={
      ...this.user,
    bibliotecaRecetas: {...this.user.bibliotecaRecetas, nombre: nombre}
    };
    this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
      this.user=response;
    })
  }

  descripcionListaActualizar(descripcion: string){
    const usuarioActualizado: Usuario={
      ...this.user,
    bibliotecaRecetas: {...this.user.bibliotecaRecetas, descripcion: descripcion}
    };
    this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
      this.user=response;
    })
  }

  modificarMostrarEditar (){
    this.mostrarEditar=!this.mostrarEditar;
  }


  /*loggedInStatus!: Number;
  userLogged!: Usuario;
  subcripcion!: Subscription;

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
      this.userLogged = user;
      console.log(this.userLogged);
    });
  }*/

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
