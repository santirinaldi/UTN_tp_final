import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';

@Component({
  selector: 'app-biblioteca-recetas',
  templateUrl: './biblioteca-recetas.component.html',
  styleUrls: ['./biblioteca-recetas.component.css']
})
export class BibliotecaRecetasComponent {
  
  constructor (private servicioUsuario: UsuarioService) {
  }

  @ViewChild('lista')lista!:ElementRef;
  @ViewChild('popupItem')popupItem!:ElementRef;

  // crearView() {
  //   const log = this.servicioUsuario.checkLoggedIn();
  //   const userList = this.servicioUsuario.getUsers();
  //   console.log(userList);
  //   userList.forEach((item) => {
  //     console.log(item);
  //   })
  // //   user.bibliotecaRecetas.listaRecetas.forEach((receta) => {
  // //     const li = document.createElement('li');
  // //     const btnRemove = document.createElement('button');
  // //     const p = document.createElement('p');
  // //     p.textContent = String(receta.texto);
  // //     li.appendChild(p);
  // //     this.lista.nativeElement.appendChild(li);
  // //   })
  // // }
  // }
  
}
