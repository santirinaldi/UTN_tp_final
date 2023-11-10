import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { GetAPIService } from 'src/app/services/API/get-api.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';

import { Lista } from 'src/app/Models/lista';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consultar-receta',
  templateUrl: './consultar-receta.component.html',
  styleUrls: ['./consultar-receta.component.css'],
})
export class ConsultarRecetaComponent implements OnInit {
  apiResponse: string = 'testtesttesttesttesttest';

  food: Array<string> = [];
  objetives: Array<string> = [];
  foodLimits: Array<string> = [];
  maxCalories: number = 0;
  userList: Usuario[] = [];
  suscription = new Subscription();
  userEmail: string = '';
  userPass: string = '';

  recipeText: string = '';
  @ViewChild('result') result!: ElementRef;
  @ViewChild('popupLogin') popupLogin!: ElementRef;
  @ViewChild('loginResult') loginResult!: ElementRef;
  @ViewChild('queryResult') queryResult!: ElementRef;

  constructor(
    private servicioUsuario: UsuarioService,
    private jsonService: JSONService,
    private apiservice: GetAPIService
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.suscription = this.jsonService.refresh$.subscribe(() => {
      this.getUsers();
    });
  }

  getUsers() {
    this.jsonService.getAll().subscribe((data: Usuario[]) => {
      this.userList = data.filter((item: Usuario) => item.baja !== 1);
      console.log(this.userList);
    });
  }

  createMessage() {
    const log = this.servicioUsuario.checkLoggedIn();
    console.log(this.food.toString());
    const message = ` Quiero una receta con estas caracteristicas: Tipo de comida: ${this.food.toString()} . Objetivos: ${this.objetives.toString()}. Calorias Maximas: ${
      this.maxCalories
    }. Limitaciones: ${this.foodLimits.toString()}.`;
    console.log(message);
    this.apiservice._apiRequest(message).subscribe((response) => {
      console.log(response);
    });
    this.createView(Number(log));
  }

  // pedidoAPI(message: string) {
  //   this.apiservice
  //     .apiRequest(message)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       //this.apiResponse = json.answer;
  //       console.log(this.apiResponse);
  //     })
  //     .catch((error) => console.log(error));
  // }

  agregarReceta() {
    const log = this.servicioUsuario.checkLoggedIn();
    const user: Usuario = this.servicioUsuario.getUser(
      Number(log),
      this.userList
    );
    if (user) {
      let lista = new Lista();
      lista.nombre = 'Mi receta';
      lista.texto = this.apiResponse;
      user.bibliotecaRecetas.listaRecetas.push(lista);
      this.jsonService.putUser(user).subscribe((response) => {
        console.log(response);
      });

      let qrh4 = document.createElement('h4');
      qrh4.style.color = '#fff';
      qrh4.innerHTML = 'Receta cargada correctamente';
      this.queryResult.nativeElement.appendChild(qrh4);
      this.queryResult.nativeElement.style.visibility = 'visible';
      this.popupLogin.nativeElement.style.display = 'none';
      setTimeout(() => {
        this.result.nativeElement.style.display = 'none';
        this.queryResult.nativeElement.style.visibility = 'hidden';
        this.queryResult.nativeElement.removeChild(qrh4);
        let rp = document.querySelector('.data p');
        let rb = document.querySelector('.data button');
        this.result.nativeElement.removeChild(rp);
        this.result.nativeElement.removeChild(rb);
      }, 2000);
    } else {
      let qrh4 = document.createElement('h4');
      qrh4.style.color = '#fff';
      qrh4.innerHTML = 'Error al cargar la receta a la biblioteca!';
      this.queryResult.nativeElement.appendChild(qrh4);
      this.queryResult.nativeElement.style.visibility = 'visible';
      this.popupLogin.nativeElement.style.display = 'none';
      setTimeout(() => {
        this.result.nativeElement.style.display = 'none';
        this.queryResult.nativeElement.style.visibility = 'hidden';
        this.queryResult.nativeElement.removeChild(qrh4);
        let rp = document.querySelector('.data p');
        let rb = document.querySelector('.data button');
        this.result.nativeElement.removeChild(rp);
        this.result.nativeElement.removeChild(rb);
      }, 2000);
    }
  }

  createView(log: number) {
    this.result.nativeElement.style.display = 'flex';
    const p = document.createElement('p');
    const btn = document.createElement('button');

    p.textContent = this.apiResponse;
    //estilos p
    p.style.padding = '2rem';
    //fin estilos p

    //estilos btn
    btn.style.fontFamily = "'Quicksand', sans-serif";
    btn.style.fontWeight = '700';
    btn.style.fontSize = '0.83rem';
    btn.style.padding = '1rem';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.transition = '.35s ease-in-out';
    btn.style.marginBottom = '2rem';
    btn.style.marginLeft = '2rem';
    btn.style.marginRight = '2rem';
    //fin estilos btn

    if (log) {
      btn.style.backgroundColor = '#000';
      btn.style.color = '#fff';
      btn.textContent = 'Guardar receta';
      btn.onclick = () => {
        this.agregarReceta();
      };
    } else {
      btn.style.backgroundColor = '#a1a1a1';
      btn.style.color = '#000';
      btn.innerHTML =
        'Necesita estar logueado para poder guardar esta rutina. Pulse aqui para iniciar sesion';
      btn.onclick = () => {
        this.openLoginModal();
      };
    }

    p.textContent = this.apiResponse;
    this.result.nativeElement.appendChild(p);
    this.result.nativeElement.appendChild(btn);
  }

  login() {
    //let userList = this.jsonService.getAll();
    let userID = -1;
    let lrMsg = document.createElement('h4');

    this.userList.forEach((user) => {
      console.log('US: ', this.userList);
      if (user.email == this.userEmail && user.passWord == this.userPass) {
        console.log('encontro');
        userID = user.id;
      }
    });

    if (userID !== -1) {
      localStorage.setItem('userLoggedin', `${userID}`);

      let button: HTMLElement | null = document.querySelector('.data>button');
      let pRecipe: HTMLElement | null = document.querySelector('.data>p');
      let routine = '';

      if (pRecipe != null) {
        routine = pRecipe.innerHTML;
      }

      if (button != null) {
        button.innerHTML = 'Guardar receta';
        button.style.backgroundColor = '#000';
        button.style.color = '#fff';

        button.addEventListener('click', () => {
          this.agregarReceta();
        });
      }

      lrMsg.innerHTML = 'Inicio de sesion exitoso!';
      lrMsg.style.color = '#fff';
      this.loginResult.nativeElement.appendChild(lrMsg);
      this.loginResult.nativeElement.style.visibility = 'visible';
      setTimeout(() => {
        this.popupLogin.nativeElement.style.display = 'none';
        this.loginResult.nativeElement.removeChild(lrMsg);
      }, 2000);
    } else {
      lrMsg.innerHTML = 'Error! Email o password incorrectos.';
      lrMsg.style.color = '#fff';
      this.loginResult.nativeElement.appendChild(lrMsg);
      this.loginResult.nativeElement.style.visibility = 'visible';
      setTimeout(() => {
        this.loginResult.nativeElement.style.visibility = 'hidden';
        this.loginResult.nativeElement.removeChild(lrMsg);
      }, 2000);
    }
  }

  openLoginModal() {
    this.popupLogin.nativeElement.style.display = 'block';
  }
}
