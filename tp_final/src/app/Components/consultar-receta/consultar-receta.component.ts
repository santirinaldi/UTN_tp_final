import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { GetAPIService } from 'src/app/services/API/get-api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { Lista } from 'src/app/Models/lista';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consultar-receta',
  templateUrl: './consultar-receta.component.html',
  styleUrls: ['./consultar-receta.component.css'],
})
export class ConsultarRecetaComponent implements OnInit {
  apiResponse: string = 'testtesttesttesttesttest';
  @ViewChild('result') result!: ElementRef;

  food: Array<string> = [];
  objetives: Array<string> = [];
  foodLimits: Array<string> = [];
  maxCalories: number = 0;
  userList: Usuario[] = [];
  suscription = new Subscription();

  constructor(private servicioUsuario: UsuarioService, private jsonService: JSONService, private apiservice: GetAPIService) {}

  ngOnInit(): void {
    this.getUsers();

    this.suscription = this.jsonService.refresh$.subscribe(() => {
      this.getUsers();
    });
  }

  getUsers() {
    this.jsonService.getAll().subscribe((data: Usuario[]) => {
      this.userList = data.filter((item:Usuario) => item.baja !== 1);
      console.log(this.userList);
    });
  }

  createMessage() {
    const log = this.servicioUsuario.checkLoggedIn();
    if (log !== null) {
      console.log(this.food.toString());
      const message = ` Quiero una receta con estas caracteristicas: Tipo de comida: ${this.food.toString()} . Objetivos: ${this.objetives.toString()}. Calorias Maximas: ${this.maxCalories
        }. Limitaciones: ${this.foodLimits.toString()}.`;
      console.log(message);
      this.apiservice._apiRequest(message).subscribe((response) => {
        console.log(response);
      });
      this.createView(Number(log));
    }
  }

  // pedidoAPI(message: string) {
  //   this.apiservice
  //     .apiRequest(message)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       //this.apiResponse = json.answer;
  //       console.log(this.apiResponse);
  //     })
  //     .catch((error) => console.log(error));
  // }

  agregarReceta(log:number) {
      const user: Usuario = this.servicioUsuario.getUser(log, this.userList);
      let lista = new Lista();
      lista.nombre = "Mi receta";
      lista.texto = this.apiResponse;
      user.bibliotecaRecetas.listaRecetas.push(lista);
      this.jsonService.putUser(user);
  }

  createView(log:number) {
    const p = document.createElement('p');
    const btnAdd = document.createElement('button');
    btnAdd.textContent = 'Agregar a mi Lista';
    btnAdd.onclick = () => {
      this.agregarReceta(log);
    };
    p.textContent = this.apiResponse;
    this.result.nativeElement.appendChild(p);
    this.result.nativeElement.appendChild(btnAdd);
  }
}
