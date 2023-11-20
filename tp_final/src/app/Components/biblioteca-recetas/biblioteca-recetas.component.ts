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
  protected user: Usuario = new Usuario();
  protected recetaActual?: Lista;
  protected mostrarEditar: boolean = false;
  protected mostrarVer: boolean = false;

  loggedInStatus!: Number;
  subcripcion!: Subscription;
  userLogged!: Usuario;

  constructor(
    private servicioUsuario: UsuarioService,
    private jsonService: JSONService,
    private loginService: LoginService
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
      this.user = user;
    });
  }

  mostrarReceta(receta: Lista) {
    console.log(receta);
    this.mostrarVer=!this.mostrarVer;
    this.recetaActual = receta;
    
  }

  modificarMostrarVer(){
    this.mostrarVer=!this.mostrarVer;
  }

  /*  <div *ngIf="mostrarVer"
  (click)="modificarMostrarVer()"*/


  nombreListaActualizar(nombre: string) {
    const usuarioActualizado: Usuario = {
      ...this.user,
      bibliotecaRecetas: { ...this.user.bibliotecaRecetas, nombre: nombre },
    };
    this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
    });
  }

  descripcionListaActualizar(descripcion: string) {
    const usuarioActualizado: Usuario = {
      ...this.user,
      bibliotecaRecetas: {
        ...this.user.bibliotecaRecetas,
        descripcion: descripcion,
      },
    };
    this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
    });
  }

    modificarMostrarEditar (){
      this.mostrarEditar=!this.mostrarEditar;
    }

  eliminarReceta(receta: Lista) {
    var index = this.user.bibliotecaRecetas.listaRecetas.indexOf(receta);
    if (index !== -1) {
      this.user.bibliotecaRecetas.listaRecetas.splice(index, 1);
      
      this.jsonService.putUser(this.user).subscribe((response) => {
        const lista: Lista={
          nombre: '',
          texto: '',
        }
        this.recetaActual=lista;
      });
    }
  }}

