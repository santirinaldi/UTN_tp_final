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
    //const apiRes = this.pedidoAPI(message);

    //console.log("APIRES: ", apiRes);

    //test

    const p = document.createElement("p");
    const btn = document.createElement("button");
    
    p.textContent = "Aquí tienes una rutina de ejercicio teniendo en cuenta tus objetivos, condición física, disponibilidad de días y lesión en la rodilla. Como mencionaste que tienes equipamiento en casa, intentaremos adaptar la rutina a los recursos que tienes: Día 1: Cardio y musculación - Calentamiento: 5-10 minutos de saltos de cuerda o marcha en el lugar. - Cardio: Realiza 30 minutos de ejercicio cardiovascular de baja intensidad, como bicicleta estática, elíptica o caminar rápido. - Musculación: Realiza una serie de 12-15 repeticiones de los siguientes ejercicios: 1. Sentadillas (con cuidado y sin bajar demasiado). 2. Flexiones de brazos (adaptando el movimiento a tus necesidades). 3. Plancha abdominal (sostenerte en antebrazos y pies). 4. Peso muerto (con mancuernas o botellas de agua). 5. Zancadas (evitando que la rodilla afectada se mueva en exceso). Día 2: Cardio y resistencia - Calentamiento: 5-10 minutos de saltos de cuerda o marcha en el lugar. - Cardio: Realiza 30 minutos de ejercicio cardiovascular de moderada intensidad, como subir y bajar escaleras, saltar la cuerda o hacer ejercicios aeróbicos en casa. - Resistencia: Realiza ejercicios de resistencia utilizando tu propio peso corporal. Por ejemplo, tablas de ejercicios pliométricos como saltos de cajón o burpees, o ejercicios de core como planchas laterales. Día 3: Descanso activo o ejercicio de bajo impacto - Dedica este día para hacer actividades de bajo impacto que no afecten tu lesión en la rodilla. Puedes optar por yoga, pilates, caminatas tranquilas o cualquier otro ejercicio que te resulte cómodo y sin dolor. Recomendaciones adicionales: - Realiza estiramientos suaves antes y después de cada sesión de ejercicio para prevenir lesiones y mejorar la flexibilidad. - Escucha a tu cuerpo: si sientes dolor o molestias durante cualquier ejercicio, detente y consulta con un profesional. - Asegúrate de mantener una alimentación equilibrada y saludable para maximizar los resultados de tu rutina de ejercicio. Recuerda que siempre es recomendable consultar con un profesional en acondicionamiento físico o fisioterapeuta para adaptar la rutina a tus necesidades específicas y asegurarte de que estás realizando los ejercicios de forma correcta.";
    p.style.padding = "2rem";

    btn.innerHTML = "Guardar rutina";
    btn.addEventListener("click", () => {
      this.addRoutineOnLibrary(p.innerHTML);
    });
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
    btn.style.backgroundColor = "#000";
    btn.style.color = "#fff";

    this.routineMessage.nativeElement.appendChild(p);
    this.routineMessage.nativeElement.appendChild(btn);

  }

  addRoutineOnLibrary(message: string) {
    console.log("msg: ", message);
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
