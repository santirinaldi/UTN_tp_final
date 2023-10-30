import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAPIService {
  private apiURL = 'https://jsonplaceholder.typicode.com/posts';

  private endpoint = "https://chatgpt-api8.p.rapidapi.com/";

  private apiKey = "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";

  constructor() { }

  getAll(): Promise<any> { /// EJEMPLO GET
    return fetch(this.apiURL); /// RETORNA UNA PROMESA A CAPTURAR EN EL COMPONENTE QUE LO REQUIERA
  }


  apiRequest(message: string) {  

    console.log("BODY: ", JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    }));

    //const url = '	https://api.openai.com/v1/chat/completions';
    const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'ad44ee4ad8msh759cec7c25fc2cap1368b5jsn3d6d200336c1',
        'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
        //'Authorization': `Bearer ${this.apiKey}`,
      },
      
      /*body: JSON.stringify({
        //model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'hola'
          }
        ]
      })*/

      body: JSON.stringify({
        question: message
      })

      /*body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        prompt: message,
        max_tokens: 10, // Ajusta este valor según tus necesidades
      }),*/
        
    };

    fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      // Maneja la respuesta aquí
      //const answer = data.choices[0].message.content;
      console.log('Respuesta de ChatGPT: ', data);
    })
    .catch((error) => {
      console.error('Error al realizar la solicitud a la API: ', error);
    });

    return null;

  };
    
}
