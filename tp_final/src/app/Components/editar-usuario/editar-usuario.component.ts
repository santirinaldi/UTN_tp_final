import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { Route, Router, UrlSegment } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  minLength: number = 5;

  loggedInStatus!: Number;
  userLogged!: Usuario;
  subcripcion!: Subscription;

  editForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    passWord: ['', [Validators.required, Validators.minLength(this.minLength)]],
  });

  @ViewChild('modifyResult') modifyResult!: ElementRef;

  constructor(
    private servicioUsuario: UsuarioService,
    private loginService: LoginService,
    private jsonService: JSONService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginService.getisLoggedIn().subscribe((value) => {
      this.loggedInStatus = value;
      if (this.loggedInStatus != -1) {
        this.getUser();
      } else {
        //this.router.navigateByUrl('inicio-sesion');
      }
    });

    this.subcripcion = this.jsonService.refresh$.subscribe(() => {
      this.getUser();
    });
  }

  get name() {
    return this.editForm.controls.name;
  }

  
  get lastName() {
    return this.editForm.controls.lastName;
  }

  get email() {
    return this.editForm.controls.email;
  }

  get passWord() {
    return this.editForm.controls.passWord;
  }

  getUser() {
    this.jsonService.getUserByID(this.loggedInStatus).subscribe((user) => {
      this.userLogged = user;
      this.name.setValue(this.userLogged.name);
      this.lastName.setValue(this.userLogged.lastName);
      this.email.setValue(this.userLogged.email);
      this.passWord.setValue(this.userLogged.passWord);
      //this.editForm.value.name = this.userLogged.name; 
    });
  }

  editarUsuario() {
    let user: Usuario = this.userLogged;
    console.log(this.editForm.value)
    if (this.loggedInStatus != -1) {
      if(this.editForm.status == 'VALID') {
        if (this.editForm.value.name) {
          user.name = this.editForm.value.name;
        }
        if (this.editForm.value.lastName) {
          user.lastName = this.editForm.value.lastName;
        }
        if (this.editForm.value.email) {
          user.email = this.editForm.value.email;
        }
        if (this.editForm.value.passWord) {
          user.passWord = this.editForm.value.passWord;
        }
        this.jsonService.putUser(user).subscribe((response) => {
          const h5 = document.createElement('h5');
          if (response) {
            h5.textContent = 'Cambios aplicados!';
          } else {
            h5.textContent = 'Error!';
          }
          this.modifyResult.nativeElement.appendChild(h5);
          this.modifyResult.nativeElement.classList.add('show');
          setTimeout(() => {
            this.modifyResult.nativeElement.classList.remove('show');
            this.modifyResult.nativeElement.removeChild(h5);
          }, 2000);
        });  
      }
    }
  }
}
