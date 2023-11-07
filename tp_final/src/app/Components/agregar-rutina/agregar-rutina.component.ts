import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { GetAPIService } from 'src/app/services/API/get-api.service';

import { Rutina } from 'src/app/Models/rutina';

import { UsuarioService } from 'src/app/services/usuario.service';
import { JSONService } from 'src/app/services/JSON/json.service';

import { Lista } from 'src/app/Models/lista';

import { Usuario } from 'src/app/Models/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agregar-rutina',
  templateUrl: './agregar-rutina.component.html',
  styleUrls: ['./agregar-rutina.component.css']
})
export class AgregarRutinaComponent implements OnInit {

  private apiResponse: string = "";
  suscription = new Subscription();
  userList: Usuario[] = [];
  objetives: Array<string> = [];
  physicalCondition: string = "";
  availableDays: string = "";
  equipment: Array<string> = [];
  preferences: string = "";
  userEmail: string = '';
  userPass: string = '';
  routineText: string = '';
  @ViewChild('routinemessage')routineMessage!:ElementRef;
  @ViewChild('popupLogin')popupLogin!:ElementRef;
  @ViewChild('loginResult')loginResult!:ElementRef;
  @ViewChild('queryResult')queryResult!:ElementRef;
  

  constructor(private apiservice: GetAPIService, private servicioUsuario: UsuarioService, private jsonService: JSONService) {
  }


  ngOnInit(): void {
    this.getUsers();

    this.suscription = this.jsonService.refresh$.subscribe(() => {
      this.getUsers();
    });
  }

  getUsers() {
    this.jsonService.getAll().subscribe((data: Usuario[]) => {
      this.userList = data.filter((item:Usuario) => item.baja !== 1);
      console.log(this.userList);
    });
  }
  
  createMessage() {

    let objetivesString = "";

    this.objetives.forEach((item, index) => {
      if(index != (this.objetives.length -1)) {
        objetivesString = objetivesString + item + ", ";
      }else{
        objetivesString = objetivesString + item;
      }
    });

    const message = `Quiero una rutina de ejercicio con estas caracteristicas: objetivos: ${objetivesString}. Mi condicion fisica: ${this.physicalCondition}. Dias disponibles por semana: ${this.availableDays}. Limitaciones ${this.equipment}. ${this.preferences}`;
    //const apiRes = this.pedidoAPI(message);

    //console.log("APIRES: ", apiRes);

    //test

    this.routineMessage.nativeElement.style.display = "flex";

    this.routineText = 'Rutina de ejemplo 4';

    const p = document.createElement("p");
    const btn = document.createElement("button");
    
    p.textContent = this.routineText;
    //estilos p
    p.style.padding = "2rem";
    //fin estilos p

    //estilos btn
    btn.style.fontFamily = "'Quicksand', sans-serif";
    btn.style.fontWeight = "700";
    btn.style.fontSize = "0.83rem";
    btn.style.padding = "1rem";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.transition = ".35s ease-in-out";
    btn.style.marginBottom = "2rem";
    btn.style.marginLeft = "2rem";
    btn.style.marginRight = "2rem";
    //fin estilos btn

    let lsItem: any;
    if(localStorage.getItem('userLoggedin')) {
      lsItem = localStorage.getItem('userLoggedin');
    }else{
      lsItem = "";
    }

    if(localStorage.getItem('userLoggedin')) {
      //estilos y texto btn activo
      btn.style.backgroundColor = "#000";
      btn.style.color = "#fff";
      btn.innerHTML = "Guardar rutina";
      btn.addEventListener("click", () => {
        this.addRoutineOnLibrary(p.innerHTML,  lsItem);
      });
    }else{
      //estilos y texto btn inactivo
      btn.style.backgroundColor = "#a1a1a1";
      btn.style.color = "#000";
      btn.innerHTML = "Necesita estar logueado para poder guardar esta rutina. Pulse aqui para iniciar sesion";
      btn.addEventListener("click", () => {
        this.openLoginModal();
      });
    }

    this.routineMessage.nativeElement.appendChild(p);
    this.routineMessage.nativeElement.appendChild(btn);

  }

  addRoutineOnLibrary(message: string, id: string) {

    let ubid = this.servicioUsuario.getUser(Number(id),this.userList);

    console.log("uL: ", this.userList);

    if(ubid) {
      console.log("ubid: ", ubid);
      ubid.bibliotecaRutinas.listaRutinas.push({nombre: "Mi rutina", texto: message});
      this.jsonService.putUserFetch(ubid);

      /*
      agus:

      let lista = new Lista();
      lista.nombre = "Mi rutina";
      lista.texto = this.apiResponse;
      ubid.bibliotecaRutinas.listaRutinas.push(lista);
      this.jsonService.putUser(ubid);

      */

      let qrh4 = document.createElement("h4");
      qrh4.style.color = "#fff";
      qrh4.innerHTML = "Rutina cargada correctamente";
      this.queryResult.nativeElement.appendChild(qrh4);
      this.queryResult.nativeElement.style.visibility = "visible";
      this.popupLogin.nativeElement.style.display = "none";
      setTimeout(() => {
        this.routineMessage.nativeElement.style.display = "none";
        this.queryResult.nativeElement.style.visibility = "hidden";
        this.queryResult.nativeElement.removeChild(qrh4);
        let rp = document.querySelector(".data p");
        let rb = document.querySelector(".data button");
        this.routineMessage.nativeElement.removeChild(rp);
        this.routineMessage.nativeElement.removeChild(rb);
      }, 2000);

    }else{
      let qrh4 = document.createElement("h4");
      qrh4.style.color = "#fff";
      qrh4.innerHTML = "Error al cargar la rutina a la biblioteca!";
      this.queryResult.nativeElement.appendChild(qrh4);
      this.queryResult.nativeElement.style.visibility = "visible";
      this.popupLogin.nativeElement.style.display = "none";
      setTimeout(() => {
        this.routineMessage.nativeElement.style.display = "none";
        this.queryResult.nativeElement.style.visibility = "hidden";
        this.queryResult.nativeElement.removeChild(qrh4);
        let rp = document.querySelector(".data p");
        let rb = document.querySelector(".data button");
        this.routineMessage.nativeElement.removeChild(rp);
        this.routineMessage.nativeElement.removeChild(rb);
      }, 2000);
    }

  }

  openLoginModal() {
    this.popupLogin.nativeElement.style.display = "block";
  }

  login() {

    //let userList = this.jsonService.getAll();
    let userID = -1;
    let lrMsg = document.createElement("h4");

    this.userList.forEach((user) => {
      console.log("US: ", this.userList);
      if(user.email == this.userEmail && user.passWord == this.userPass) {
        console.log("encontro");
        userID = user.id;
      }
    });

    if(userID !== -1) {
      localStorage.setItem("userLoggedin", `${userID}`);

      let button: HTMLElement | null = document.querySelector(".data>button");
      let pRoutine: HTMLElement | null = document.querySelector(".data>p");
      let routine = '';

      if(pRoutine != null) {
        routine = pRoutine.innerHTML;
      }
      

      if(button != null) {

        button.innerHTML = "Guardar rutina";
        button.style.backgroundColor = "#000";
        button.style.color = "#fff";

        button.addEventListener("click", () => {
          this.addRoutineOnLibrary(routine,  `${userID}`);
        });
      }

      lrMsg.innerHTML = "Inicio de sesion exitoso!";
      lrMsg.style.color = "#fff";
      this.loginResult.nativeElement.appendChild(lrMsg);
      this.loginResult.nativeElement.style.visibility = "visible";
      setTimeout(() => {
        this.popupLogin.nativeElement.style.display = "none";
        this.loginResult.nativeElement.removeChild(lrMsg);
      }, 2000);
      

    }else{

      lrMsg.innerHTML = "Error! Email o password incorrectos.";
      lrMsg.style.color = "#fff";
      this.loginResult.nativeElement.appendChild(lrMsg);
      this.loginResult.nativeElement.style.visibility = "visible";
      setTimeout(() => {
        this.loginResult.nativeElement.style.visibility = "hidden";
        this.loginResult.nativeElement.removeChild(lrMsg);
      }, 2000);

    }

  }

  pedidoAPI(message: string) {

    const apiRes = this.apiservice.apiRequest(message);
    apiRes.then((response) => response.json())
    .then((data) => {
      // Maneja la respuesta aquí
      //const answer = data.choices[0].message.content;
      console.log('Respuesta de ChatGPT: ', data);
      const p = document.createElement("p");
      p.textContent = data.answer;
      this.routineMessage.nativeElement.appendChild(p);
    })
    .catch((error) => {
      console.error('Error al realizar la solicitud a la API: ', error);
      return null;
    });
  }

}