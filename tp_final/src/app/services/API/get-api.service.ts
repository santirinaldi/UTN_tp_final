import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAPIService {

  private apiURL = 'https://simple-chatgpt-api.p.rapidapi.com/ask';

  //private rapidApiKey = "ad44ee4ad8msh759cec7c25fc2cap1368b5jsn3d6d200336c1";
  //private rapidApiHost = "simple-chatgpt-api.p.rapidapi.com";

  private rapidApiKey = "f46e139634msh1a9d58d2c185f52p1bba68jsn64f299cc2865";
  private rapidApiHost = "simple-chatgpt-api.p.rapidapi.com";

  constructor() { }

  getAll(): Promise<any> { /// EJEMPLO GET
    return fetch(this.apiURL); /// RETORNA UNA PROMESA A CAPTURAR EN EL COMPONENTE QUE LO REQUIERA
  }


  apiRequest(message: string) {  

    const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': this.rapidApiKey,
        'X-RapidAPI-Host': this.rapidApiHost
      },
      body: JSON.stringify({
        question: message
      }) 
    };

    return fetch(url, options);

  };
    
}
