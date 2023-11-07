import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';

@Component({
  selector: 'app-biblioteca-rutinas',
  templateUrl: './biblioteca-rutinas.component.html',
  styleUrls: ['./biblioteca-rutinas.component.css']
})
export class BibliotecaRutinasComponent implements OnInit {
  protected user: Usuario= new Usuario();
  constructor (private servicioUsuario: UsuarioService){}

    
  
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
}

