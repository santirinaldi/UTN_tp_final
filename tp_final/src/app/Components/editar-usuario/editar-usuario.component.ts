import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  userName: string = '';
  userLastname: string = '';
  userEmail: string = '';
  userPass: string = '';

  loggedInStatus!: Number;
  userLogged!: Usuario;
  subcripcion!: Subscription;

  @ViewChild('modifyResult') modifyResult!: ElementRef;

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

  editarUsuario() {
    if (this.loggedInStatus != -1) {
      if (this.userName.length > 0) {
        this.userLogged.name = this.userName;
      }
      if (this.userLastname.length > 0) {
        this.userLogged.lastName = this.userLastname;
      }
      if (this.userEmail.length > 0) {
        this.userLogged.email = this.userEmail;
      }
      if (this.userPass.length > 0) {
        this.userLogged.passWord = this.userPass;
      }

      this.jsonService.putUser(this.userLogged).subscribe((response) => {
        //que pase algo o no
      });
      console.log('Actualizando..');
      //this.router.navigate(['inicio']);
      const h5 = document.createElement('h5');
      h5.textContent = 'editado exitosamente!';
      //const text = document.createTextNode("Logeado exitosamente!");
      this.modifyResult.nativeElement.appendChild(h5);
    }
  }
}
