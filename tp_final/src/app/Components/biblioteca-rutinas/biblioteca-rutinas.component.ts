import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Subscription } from 'rxjs';

//import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
//import { UsuarioService } from 'src/app/services/usuario.service';
//import { Usuario } from 'src/app/Models/usuario';
import { Lista } from 'src/app/Models/lista';
//import { JSONService } from 'src/app/services/JSON/json.service';

@Component({
  selector: 'app-biblioteca-rutinas',
  templateUrl: './biblioteca-rutinas.component.html',
  styleUrls: ['./biblioteca-rutinas.component.css'],
})
export class BibliotecaRutinasComponent implements OnInit {


/*

protected user: Usuario= new Usuario();
  protected rutinaActual?: Lista;
  protected mostrarEditar: boolean=false;
  constructor (private servicioUsuario: UsuarioService, private jsonService: JSONService){}

    
  
    @ViewChild('lista')lista!:ElementRef;
    @ViewChild('popupItem')popupItem!:ElementRef;
  
  
    ngOnInit(): void {
      const log = this.servicioUsuario.checkLoggedIn();
      this.servicioUsuario.getUser2(1).subscribe((usuario: Usuario)=>{
        console.log(usuario);
        this.user=usuario
        console.log(this.user);
        
      });
    } 

    mostrarRutina(rutina: Lista) {
      console.log(rutina);
      this.rutinaActual=rutina;
    }

    nombreListaActualizar(nombre: string){
      const usuarioActualizado: Usuario={
        ...this.user,
      bibliotecaRutinas: {...this.user.bibliotecaRutinas, nombre: nombre}
      };
      this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
        this.user=response;
      })
    }

    descripcionListaActualizar(descripcion: string){
      const usuarioActualizado: Usuario={
        ...this.user,
      bibliotecaRutinas: {...this.user.bibliotecaRutinas, descripcion: descripcion}
      };
      this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
        this.user=response;
      })
    }

    modificarMostrarEditar (){
      this.mostrarEditar=!this.mostrarEditar;
    }

*/


  loggedInStatus!: Number;
  userLogged!: Usuario;
  subcripcion!: Subscription;

  constructor(
    private servicioUsuario: UsuarioService,
    private loginService: LoginService,
    private jsonService: JSONService
  ) {}

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
  }
}
