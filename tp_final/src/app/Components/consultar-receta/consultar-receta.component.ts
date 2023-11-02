import { Component, ViewChild, ElementRef } from '@angular/core';
import { GetAPIService } from 'src/app/services/API/get-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';

@Component({
  selector: 'app-consultar-receta',
  templateUrl: './consultar-receta.component.html',
  styleUrls: ['./consultar-receta.component.css'],
})
export class ConsultarRecetaComponent {
  apiResponse: string = 'testtesttesttesttesttest';
  @ViewChild('result') result!: ElementRef;

  food: Array<string> = [];
  objetives: Array<string> = [];
  foodLimits: Array<string> = [];
  maxCalories: number = 0;

  constructor(
    private apiservice: GetAPIService,
    private servicioUsuario: UsuarioService,
    private servicioJson: JSONService
  ) { }

  createMessage() {
    const log = this.servicioUsuario.checkLoggedIn();
    if (log !== null) {
      console.log(this.food.toString());
      const message = ` Quiero una receta con estas caracteristicas: Tipo de comida: ${this.food.toString()} . Objetivos: ${this.objetives.toString()}. Calorias Maximas: ${this.maxCalories
        }. Limitaciones: ${this.foodLimits.toString()}.`;
      console.log(message);
      //this.pedidoAPI(message);
      this.createView(Number(log));
    }
  }

  pedidoAPI(message: string) {
    this.apiservice
      .apiRequest(message)
      .then((response) => response.json())
      .then((json) => {
        //this.apiResponse = json.answer;
        console.log(this.apiResponse);
      })
      .catch((error) => console.log(error));
  }

  agregarReceta(log:number) {
      const user: Usuario = this.servicioUsuario.getUser(log);
      user.listaRecetas.push(this.apiResponse);
      this.servicioJson.putUser(user);
  }

  createView(log:number) {
    const p = document.createElement('p');
    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Agregar a mi Lista';
    btnAdd.onclick = () => {
      this.agregarReceta(log);
    };
    p.textContent = this.apiResponse;
    this.result.nativeElement.appendChild(p);
    this.result.nativeElement.appendChild(btnAdd);
  }
}
