import { Component } from '@angular/core';
import { GetAPIService } from 'src/app/services/API/get-api.service';

import { Rutina } from 'src/app/Models/rutina';

@Component({
  selector: 'app-agregar-rutina',
  templateUrl: './agregar-rutina.component.html',
  styleUrls: ['./agregar-rutina.component.css']
})
export class AgregarRutinaComponent {

  private apiResponse: string = "";

  objetives: Array<string> = [];
  physicalCondition: string = "";
  availableDays: string = "";
  equipment: Array<string> = [];
  preferences: string = "";

  constructor(private apiservice: GetAPIService) {
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

    console.log("BODY: ", JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    }));

    this.pedidoAPI(message);

  }

  async pedidoAPI(message: string) {
    /*await this.apiservice.apiRequest(message)
      .then((response) => 
        console.log("RESPONSE: ", response))
      .catch (error => 
        console.log("ERROR: ", error));  */

        this.apiservice.apiRequest(message);

/*
        try {
          const response = await this.apiservice.apiRequest(message);
          const result = await response.text();
          console.log("RESPONSE: ", response);
          console.log("RESULT: ", result);
        } catch (error) {
          console.error("ERROR: ", error);
        }*/
  }

}
