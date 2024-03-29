import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

//import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  loginError: string = '';
  // userList: Usuario[] = [];

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    passWord: ['', [Validators.required]],
  });

  loggedInStatus: Number = -1;
  userLogged!: Usuario;
  subcripcion!: Subscription;

  @ViewChild('invalidData') invalidData!: ElementRef;

  //constructor(private servicioUsuario: UsuarioService, private jsonService: JSONService, private router: Router) {}

  constructor(
    private servicioUsuario: UsuarioService,
    private jsonService: JSONService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // this.getUsers();
    // this.suscription = this.jsonService.refresh$.subscribe(() => {
    //   this.getUsers();
    // });
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.passWord;
  }

  /*let userID = this.buscarUsuario(user);
    console.log(userID);
    if (userID !== -1) {
      localStorage.setItem('userLoggedin', `${userID}`);
      const h5 = document.createElement('h5');
      h5.textContent = 'Logeado exitosamente!';
      this.router.navigate(['inicio']);
      //const text = document.createTextNode("Logeado exitosamente!");
      this.loginResult.nativeElement.appendChild(h5);
      //this.refresh();*/

  // getUsers() {
  //   this.jsonService.getAll().subscribe((data: Usuario[]) => {
  //     this.userList = data.filter((item: Usuario) => item.baja !== 1);
  //     console.log(this.userList);
  //   });

  login() {
    //console.log(this.loginForm.value);
    if (this.loginForm.status == 'VALID') {
      //this.verifyUser();
      this.loginService
        .getUserDetail(this.loginForm.value as LoginRequest)
        .subscribe((response) => {
          if (response[0] != undefined) {
            console.log(response);
            this.loginService.setLoggedIn(response[0].id);
            this.loggedInStatus = response[0].id;
            setTimeout(() => {
              this.loginForm.reset();
              this.router.navigateByUrl('/inicio');
            }, 1000);
          } else {
            this.invalidData.nativeElement.style.display = 'block';
            setTimeout(() => {
              this.invalidData.nativeElement.style.display = 'none';
            }, 1000);
            console.log();
          }
        });
    } else {
      alert('Error al ingresar los datos');
      this.loginForm.markAllAsTouched();
    }
  }

  // verifyUser() {
  //   console.log(this.userList);
  //   let user = new Usuario();
  //   const email = this.loginForm.value.email;
  //   const password = this.loginForm.value.passWord;
  //   if (email && password) {
  //     user.email = email;
  //     user.passWord = password;
  //   }
  //   let userID = this.buscarUsuario(user);
  //   console.log(userID);
  //   if (userID !== -1) {
  //     localStorage.setItem('userLoggedin', `${userID}`);
  //     const h5 = document.createElement('h5');
  //     h5.textContent = 'Logeado exitosamente!';
  //     //const text = document.createTextNode("Logeado exitosamente!");
  //     this.loginResult.nativeElement.appendChild(h5);
  //     //this.refresh();
  //   } else {
  //     console.log('No encontrado', userID);
  //   }
  // }

  // buscarUsuario(userBuscado: Usuario) {
  //   console.log(this.userList);
  //   let userID = -1;

  //   this.userList.forEach((user) => {
  //     console.log(user.passWord);
  //     if (
  //       user.passWord == userBuscado.passWord &&
  //       user.email == userBuscado.email
  //     ) {
  //       console.log('encontro');
  //       userID = user.id;
  //     }
  //   });

  //   return userID;
  // }
}
