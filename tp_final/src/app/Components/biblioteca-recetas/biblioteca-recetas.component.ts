import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Lista } from 'src/app/Models/lista';
import { JSONService } from 'src/app/services/JSON/json.service';

@Component({
  selector: 'app-biblioteca-recetas',
  templateUrl: './biblioteca-recetas.component.html',
  styleUrls: ['./biblioteca-recetas.component.css'],
})
export class BibliotecaRecetasComponent implements OnInit {
  protected user: Usuario= new Usuario();
  protected recetaActual?: Lista;
  protected mostrarEditar: boolean=false;
  
  constructor (private servicioUsuario: UsuarioService, private jsonService: JSONService){}
  filterPost = '';

    
  
    @ViewChild('lista')lista!:ElementRef;
    @ViewChild('popupItem')popupItem!:ElementRef;
  
  
    ngOnInit(): void {
      const log = this.servicioUsuario.checkLoggedIn();
      this.servicioUsuario.getUser2(1).subscribe((usuario: Usuario)=>{
        console.log(usuario);
        this.user=usuario
        console.log(this.user);
        
      });
    } 

    mostrarReceta(receta: Lista) {
      console.log(receta);
      this.recetaActual=receta;
    }

    nombreListaActualizar(nombre: string){
      const usuarioActualizado: Usuario={
        ...this.user,
      bibliotecaRecetas: {...this.user.bibliotecaRecetas, nombre: nombre}
      };
      this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
        this.user=response;
      })
    }

    descripcionListaActualizar(descripcion: string){
      const usuarioActualizado: Usuario={
        ...this.user,
      bibliotecaRecetas: {...this.user.bibliotecaRecetas, descripcion: descripcion}
      };
      this.jsonService.putUser(usuarioActualizado).subscribe((response) => {
        this.user=response;
      })
    }

    modificarMostrarEditar (){
      this.mostrarEditar=!this.mostrarEditar;
    }

    
}
