import { Component,ViewChild,ElementRef } from '@angular/core';
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
  @ViewChild('routinemessage')routineMessage!:ElementRef;

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
    const apiRes = this.pedidoAPI(message);

    console.log("APIRES: ", apiRes);


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
