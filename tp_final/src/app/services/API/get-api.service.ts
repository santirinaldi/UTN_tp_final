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

    /*const hs = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '0d721e434fmsh928652331228961p11fcb7jsnaa6c4fed3597',
      'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
    });*/

    const url = 'https://chatgpt.p.rapidapi.com/api/chat/completions';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '0d721e434fmsh928652331228961p11fcb7jsnaa6c4fed3597',
        'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
      },
      //body: JSON.stringify(by)
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
        
    };

    return fetch(this.endpoint, options);
    
  };
    
}
