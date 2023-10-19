import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAPIService {
  private apiURL = 'https://jsonplaceholder.typicode.com/posts';

  constructor() { }

  getAll(): Promise<any> { /// EJEMPLO GET
    return fetch(this.apiURL); /// RETORNA UNA PROMESA A CAPTURAR EN EL COMPONENTE QUE LO REQUIERA
  }

//   pedidoAPI() {
//      this.userService.getAll()
//      .then((response) => response.json())
//      .then((json) => {
//        console.log(json);
//        this.userList = json;
//      })
//    .catch (error =>
//      console.log(error))
//   } CODIGO PARA CAPTURAR LA PROMESA DEL GET USAR EN EL COMPONENTE
  
}
