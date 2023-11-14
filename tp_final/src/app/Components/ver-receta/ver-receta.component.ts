import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.component.html',
  styleUrls: ['./ver-receta.component.css']
})
export class VerRecetaComponent implements OnInit {
  protected user: Usuario= new Usuario();
  constructor (private servicioUsuario: UsuarioService){}

    
  
    @ViewChild('receta')rutina!:ElementRef;
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