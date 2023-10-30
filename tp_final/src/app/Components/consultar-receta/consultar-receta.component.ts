import { Component } from '@angular/core';
import { GetAPIService } from 'src/app/services/API/get-api.service';

@Component({
  selector: 'app-consultar-receta',
  templateUrl: './consultar-receta.component.html',
  styleUrls: ['./consultar-receta.component.css'],
})
export class ConsultarRecetaComponent {
  private apiResponse: string = '';

  food: Array<string> = [];
  objetives: Array<string> = [];
  foodLimits: Array<string> = [];
  maxCalories: number = 0;

  constructor(private apiservice: GetAPIService) {}

  createMessage() {
    console.log(this.food.toString());
    const message = ` Quiero una receta con estas caracteristicas: Tipo de comida: ${this.food.toString()} . Objetivos: ${this.objetives.toString()}. Calorias Maximas: ${this.maxCalories}. Limitaciones: ${this.foodLimits.toString()}.`;
    console.log(message);
    this.pedidoAPI(message);
  }

  pedidoAPI(message: string) {
    this.apiservice.apiRequest(message)
      .then((response) => response.json())
      .then((json) => {
        this.apiResponse = json.answer;
        console.log(this.apiResponse);
      })
      .catch((error) => console.log(error));
  }
}


