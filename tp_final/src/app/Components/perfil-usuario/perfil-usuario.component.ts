import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  userName: string = '';
  userLastname: string = '';
  userEmail: string = '';
  userPassword: string = '';
  userRoutines: boolean = false;
  userRecipes: boolean = false;
  suscription = new Subscription();
  userList: Usuario[] = [];

  userLogged!: Usuario;

  constructor(private servicioUsuario: UsuarioService, private jsonService: JSONService) {}

  ngOnInit(): void {

    this.getUser();

    this.suscription = this.jsonService.refresh$.subscribe(() => {
      this.getUser();
    });

    
    
  }

  getUser() {
    this.jsonService.getAll().subscribe((data: Usuario[]) => {
      this.userList = data.filter((item:Usuario) => item.baja !== 1);
      const log = this.servicioUsuario.checkLoggedIn();
      if(log !== null) {
        this.userLogged = this.servicioUsuario.getUser(Number(log), this.userList);
        if(this.userLogged.bibliotecaRutinas.listaRutinas.length > 0) {
          this.userRoutines = true;
        }
        if(this.userLogged.bibliotecaRecetas.listaRecetas.length > 0) {
          this.userRecipes = true;
        }
      }

    });
  }

}
