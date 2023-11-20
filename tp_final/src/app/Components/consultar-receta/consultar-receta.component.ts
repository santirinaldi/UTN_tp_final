import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { GetAPIService } from 'src/app/services/API/get-api.service';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';

import { Lista } from 'src/app/Models/lista';
import { Subscription } from 'rxjs';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-receta',
  templateUrl: './consultar-receta.component.html',
  styleUrls: ['./consultar-receta.component.css'],
})
export class ConsultarRecetaComponent implements OnInit {
  apiResponse: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Accumsan lacus vel facilisis volutpat est velit. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat. Sodales neque sodales ut etiam sit. Gravida dictum fusce ut placerat orci nulla pellentesque. Turpis massa sed elementum tempus egestas sed. Enim sit amet venenatis urna. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Est ante in nibh mauris cursus mattis molestie. Auctor neque vitae tempus quam. Nisl purus in mollis nunc.Egestas pretium aenean pharetra magna ac. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Etiam dignissim diam quis enim. Turpis egestas sed tempus urna. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Tempus egestas sed sed risus. Vitae justo eget magna fermentum iaculis eu non. Id leo in vitae turpis massa. Ultrices in iaculis nunc sed augue lacus. Dolor sit amet consectetur adipiscing. In massa tempor nec feugiat nisl pretium fusce id velit.  Id eu nisl nunc mi ipsum faucibus vitae aliquet. Tellus integer feugiat scelerisque varius. Tortor consequat id porta nibh venenatis cras. Id volutpat lacus laoreet non curabitur gravida arcu ac. Sit amet risus nullam eget felis eget. Leo a diam sollicitudin tempor id eu. Nam libero justo laoreet sit amet cursus sit. Quis imperdiet massa tincidunt nunc pulvinar sapien. Volutpat diam ut venenatis tellus in metus vulputate. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur.Nec tincidunt praesent semper feugiat. Sed euismod nisi porta lorem. Ut porttitor leo a diam sollicitudin tempor id. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Viverra justo nec ultrices dui sapien eget. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Cursus turpis massa tincidunt dui ut ornare lectus. Id porta nibh venenatis cras sed felis eget velit. Arcu risus quis varius quam quisque. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Tellus mauris a diam maecenas sed enim. Lectus mauris ultrices eros in.Quam nulla porttitor massa id neque aliquam. Eget gravida cum sociis natoque penatibus. Nisl vel pretium lectus quam id. Tincidunt arcu non sodales neque sodales ut etiam sit. Tempus quam pellentesque nec nam aliquam sem. Sodales neque sodales ut etiam sit amet nisl. Felis donec et odio pellentesque diam. Ac placerat vestibulum lectus mauris ultrices eros. Scelerisque eleifend donec pretium vulputate sapien nec. Nec tincidunt praesent semper feugiat. Consequat mauris nunc congue nisi vitae suscipit tellus. Tincidunt eget nullam non nisi est sit amet facilisis magna. Facilisi etiam dignissim diam quis enim. Purus gravida quis blandit turpis.Lectus sit amet est placerat in egestas. Id eu nisl nunc mi ipsum faucibus vitae aliquet nec. Etiam non quam lacus suspendisse. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Vitae tortor condimentum lacinia quis vel eros donec. Auctor neque vitae tempus quam pellentesque. Et ultrices neque ornare aenean euismod elementum. Aliquet porttitor lacus luctus accumsan. Id neque aliquam vestibulum morbi blandit. Nulla porttitor massa id neque aliquam vestibulum. Id cursus metus aliquam eleifend mi in nulla posuere. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Bibendum neque egestas congue quisque egestas diam in. Sit amet justo donec enim diam vulputate ut pharetra. Ut sem viverra aliquet eget sit amet tellus cras. Aliquam id diam maecenas ultricies mi. Arcu cursus vitae congue mauris rhoncus aenean. Nunc mattis enim ut tellus elementum sagittis vitae. Ut ornare lectus sit amet est placerat in.';

  food!: Array<string>;
  objetives!: Array<string>;
  foodLimits!: Array<string>;
  maxCalories: number = 0;
  suscription = new Subscription();
  userEmail: string = '';
  userPass: string = '';

  subcripcion!: Subscription;
  loggedInStatus!: Number;
  userLogged!: Usuario;

  recipeText: string = '';
  @ViewChild('result') result!: ElementRef;
  @ViewChild('loginResult') loginResult!: ElementRef;
  @ViewChild('queryResult') queryResult!: ElementRef;
  @ViewChild('invalidData') invalidData!: ElementRef;

  constructor(
    private servicioUsuario: UsuarioService,
    private jsonService: JSONService,
    private apiservice: GetAPIService,
    private loginService: LoginService,
    private router: Router
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

  createMessage() {
    if (
      this.food &&
      this.foodLimits &&
      this.objetives &&
      this.maxCalories != 0
    ) {
      const message = ` Quiero una receta con estas caracteristicas: Tipo de comida: ${this.food.toString()} . Objetivos: ${this.objetives.toString()}. Calorias Maximas: ${
        this.maxCalories
      }. Limitaciones: ${this.foodLimits.toString()}.`;
      console.log(message);
      this.createView();
      // this.apiservice._apiRequest(message).subscribe((response) => {
      //   console.log(response);
      // this.apiResponse = response;
      // });
    } else {
      this.invalidData.nativeElement.style.display = 'block';
      setTimeout(() => {
        this.invalidData.nativeElement.style.display = 'none';
      }, 1500);
    }
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

  agregarReceta(listaName: string) {
    if (this.userLogged) {
      let lista = new Lista();
      lista.nombre = listaName;
      lista.texto = this.apiResponse;
      this.userLogged.bibliotecaRecetas.listaRecetas.push(lista);
      this.jsonService.putUser(this.userLogged).subscribe((response) => {
        console.log(response);
      });

      let qrh4 = document.createElement('h4');
      qrh4.style.color = '#fff';
      qrh4.innerHTML = 'Receta cargada correctamente';
      this.queryResult.nativeElement.appendChild(qrh4);
      this.queryResult.nativeElement.style.visibility = 'visible';
      setTimeout(() => {
        this.result.nativeElement.style.display = 'none';
        this.queryResult.nativeElement.style.visibility = 'hidden';
        this.queryResult.nativeElement.removeChild(qrh4);
        let rp = document.querySelector('.data p');
        let rb = document.querySelectorAll('.data button');
        let ri = document.querySelector('.data input');
        let rl = document.querySelector('.data label');
        this.result.nativeElement.removeChild(rp);
        this.result.nativeElement.removeChild(rb[0]);
        this.result.nativeElement.removeChild(rb[1]);
        this.result.nativeElement.removeChild(ri);
        this.result.nativeElement.removeChild(rl);
      }, 2000);
    } else {
      let qrh4 = document.createElement('h4');
      qrh4.style.color = '#fff';
      qrh4.innerHTML = 'Error al cargar la receta a la biblioteca!';
      this.queryResult.nativeElement.appendChild(qrh4);
      this.queryResult.nativeElement.style.visibility = 'visible';
      setTimeout(() => {
        this.result.nativeElement.style.display = 'none';
        this.queryResult.nativeElement.style.visibility = 'hidden';
        this.queryResult.nativeElement.removeChild(qrh4);
        let rp = document.querySelector('.data p');
        let rb = document.querySelectorAll('.data button');
        let ri = document.querySelector('.data input');
        let rl = document.querySelector('.data label');
        this.result.nativeElement.removeChild(rp);
        this.result.nativeElement.removeChild(rb[0]);
        this.result.nativeElement.removeChild(rb[1]);
        this.result.nativeElement.removeChild(ri);
        this.result.nativeElement.removeChild(rl);
      }, 2000);
    }
  }

  createView() {
    this.result.nativeElement.style.display = 'flex';
    const p = document.createElement('p');
    const btn = document.createElement('button');
    const btnReturn = document.createElement('button');
    const input = document.createElement('input');
    const label = document.createElement('label');
    label.innerHTML = 'Ingrese un nombre para esta receta';
    input.setAttribute('type', 'text');

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

    btnReturn.style.fontFamily = "'Quicksand', sans-serif";
    btnReturn.style.fontWeight = '700';
    btnReturn.style.fontSize = '0.83rem';
    btnReturn.style.padding = '1rem';
    btnReturn.style.border = 'none';
    btnReturn.style.cursor = 'pointer';
    btnReturn.style.transition = '.35s ease-in-out';
    btnReturn.style.marginBottom = '2rem';
    btnReturn.style.marginLeft = '2rem';
    btnReturn.style.marginRight = '2rem';

    btnReturn.style.backgroundColor = '#fff';
    btnReturn.style.color = '#000';
    btnReturn.textContent = 'Volver';
    //fin estilos btn
    //estilos input
    input.style.fontFamily = 'Quicksand, sans-serif';
    input.style.width = 'auto';
    input.style.padding = '1rem 3rem 1rem 1rem';
    input.style.border = '1px solid #fff';
    input.style.background = 'transparent';
    input.style.color = '#fff';
    input.style.marginLeft = '2rem';
    input.style.marginRight = '2rem';
    //fin estilos input

    //estilos label
    label.style.padding = '2rem 2rem 0.25rem 2rem';
    label.style.fontSize = '0.75rem';
    label.style.fontWeight = '700';
    //fin estilos label

    if (this.loggedInStatus != -1) {
      btn.style.backgroundColor = '#fff';
      btn.style.color = '#000';
      btn.textContent = 'Guardar receta';
      input.defaultValue = 'Mi receta';
      btn.onclick = () => {
        this.agregarReceta(input.value);
      };
    } else {
      input.style.display = 'none';
      label.style.display = 'none';
      btn.style.backgroundColor = '#a1a1a1';
      btn.style.color = '#000';
      btn.innerHTML =
        'Necesita estar logueado para poder guardar esta rutina. Pulse aqui para iniciar sesion';
      btn.onclick = () => {
        this.router.navigateByUrl('/inicio-sesion');
      };
    }

    p.textContent = this.apiResponse;
    this.result.nativeElement.appendChild(label);
    this.result.nativeElement.appendChild(input);
    this.result.nativeElement.appendChild(p);
    this.result.nativeElement.appendChild(btn);
    this.result.nativeElement.appendChild(btnReturn);

    btnReturn.onclick = () => {
      this.result.nativeElement.style.display = 'none';
      this.result.nativeElement.removeChild(btn);
      this.result.nativeElement.removeChild(btnReturn);
      this.result.nativeElement.removeChild(p);
      this.result.nativeElement.removeChild(input);
      this.result.nativeElement.removeChild(label);
    };
  }

  // login() {
  //   //let userList = this.jsonService.getAll();
  //   let userID = -1;
  //   let lrMsg = document.createElement('h4');

  //   this.userList.forEach((user) => {
  //     console.log('US: ', this.userList);
  //     if (user.email == this.userEmail && user.passWord == this.userPass) {
  //       console.log('encontro');
  //       userID = user.id;
  //     }
  //   });

  //   if (userID !== -1) {
  //     localStorage.setItem('userLoggedin', `${userID}`);

  //     let button: HTMLElement | null = document.querySelector('.data>button');
  //     let pRecipe: HTMLElement | null = document.querySelector('.data>p');
  //     let routine = '';

  //     if (pRecipe != null) {
  //       routine = pRecipe.innerHTML;
  //     }

  //     if (button != null) {
  //       button.innerHTML = 'Guardar receta';
  //       button.style.backgroundColor = '#000';
  //       button.style.color = '#fff';

  //       button.addEventListener('click', () => {
  //         this.agregarReceta();
  //       });
  //     }

  //     lrMsg.innerHTML = 'Inicio de sesion exitoso!';
  //     lrMsg.style.color = '#fff';
  //     this.loginResult.nativeElement.appendChild(lrMsg);
  //     this.loginResult.nativeElement.style.visibility = 'visible';
  //     setTimeout(() => {
  //       this.popupLogin.nativeElement.style.display = 'none';
  //       this.loginResult.nativeElement.removeChild(lrMsg);
  //     }, 2000);
  //   } else {
  //     lrMsg.innerHTML = 'Error! Email o password incorrectos.';
  //     lrMsg.style.color = '#fff';
  //     this.loginResult.nativeElement.appendChild(lrMsg);
  //     this.loginResult.nativeElement.style.visibility = 'visible';
  //     setTimeout(() => {
  //       this.loginResult.nativeElement.style.visibility = 'hidden';
  //       this.loginResult.nativeElement.removeChild(lrMsg);
  //     }, 2000);
  //   }
  // }
}
