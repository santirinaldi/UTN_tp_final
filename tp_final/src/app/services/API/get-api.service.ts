import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { responseInterface } from 'src/app/Components/consultar-receta/responseInterface';

@Injectable({
  providedIn: 'root',
})
export class GetAPIService {
  private apiURL = 'https://simple-chatgpt-api.p.rapidapi.com/ask';

  //private rapidApiKey = "ad44ee4ad8msh759cec7c25fc2cap1368b5jsn3d6d200336c1";
  //private rapidApiHost = "simple-chatgpt-api.p.rapidapi.com";

  private rapidApiKey = '08248903bfmshd0d75cded371bacp1811ddjsn45c1c90ffbed';
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

    return this.http.post<responseInterface>(url, httpOptions.body, httpOptions);
  }
}
