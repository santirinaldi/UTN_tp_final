import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetAPIService {
  private apiURL = 'https://simple-chatgpt-api.p.rapidapi.com/ask';

  //private rapidApiKey = "ad44ee4ad8msh759cec7c25fc2cap1368b5jsn3d6d200336c1";
  //private rapidApiHost = "simple-chatgpt-api.p.rapidapi.com";

  private rapidApiKey = 'f227c0ec34msh4a8be6e6bcf0eb0p136b11jsnb7efbd3eca8b';
  private rapidApiHost = 'simple-chatgpt-api.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  apiRequest(message: string) {
    const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': this.rapidApiKey,
        'X-RapidAPI-Host': this.rapidApiHost,
      },
      body: JSON.stringify({
        question: message,
      }),
    };

    return fetch(url, options);
  }

  _apiRequest(message: string) {
    const url = 'https://simple-chatgpt-api.p.rapidapi.com/ask';
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'X-RapidAPI-Key': this.rapidApiKey,
        'X-RapidAPI-Host': this.rapidApiHost,
      }),
      body: JSON.stringify({
        question: message,
      }),
    };

    return this.http.post(url, httpOptions.body, httpOptions);
  }
}
