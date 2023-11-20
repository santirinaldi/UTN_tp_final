import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from '../../Models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JSONService } from 'src/app/services/JSON/json.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { userExistsValidator } from 'src/app/Common/custom-validators';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})
export class RegistroUsuarioComponent implements OnInit {
  minLength: number = 5;
  loggedInStatus: Number = -1;

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [userExistsValidator(this.jsonService)],
        updateOn: 'blur',
      },
    ],
    passWord: ['', [Validators.required, Validators.minLength(this.minLength)]],
  });

  suscription = new Subscription();

  constructor(
    private servicioUsuario: UsuarioService,
    private jsonService: JSONService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get name() {
    return this.registerForm.controls.name;
  }

  get lastName() {
    return this.registerForm.controls.lastName;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get passWord() {
    return this.registerForm.controls.passWord;
  }

  addUser() {
    if (this.registerForm.status == 'VALID') {
      let user = new Usuario();
      if (
        this.registerForm.value.name != null &&
        this.registerForm.value.lastName != null &&
        this.registerForm.value.email != null &&
        this.registerForm.value.passWord != null
      ) {
        user.name = this.registerForm.value.name;
        user.lastName = this.registerForm.value.lastName;
        user.email = this.registerForm.value.email;
        user.passWord = this.registerForm.value.passWord;

        this.servicioUsuario.add(user);
        this.loggedInStatus = 1;
        this.registerForm.markAllAsTouched();
      }
    }
  }
}
