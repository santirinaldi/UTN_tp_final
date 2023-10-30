import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAPIService {
  private apiURL = 'https://simple-chatgpt-api.p.rapidapi.com/ask';

  // private endpoint = "https://chatgpt-api8.p.rapidapi.com/";

  private apiKey = 'ad44ee4ad8msh759cec7c25fc2cap1368b5jsn3d6d200336c1';

  constructor() { }

  apiRequest(message: string) {  
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': 'simple-chatgpt-api.p.rapidapi.com'
      },

      body: JSON.stringify({
        question: message
      })     
    };

    return fetch(this.apiURL, options);
  };
    
}
