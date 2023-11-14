import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';

@Component({
  selector: 'app-ver-rutina',
  templateUrl: './ver-rutina.component.html',
  styleUrls: ['./ver-rutina.component.css']
})
export class VerRutinaComponent implements OnInit {
  protected user: Usuario= new Usuario();
  constructor (private servicioUsuario: UsuarioService){}

    
  
    @ViewChild('rutina')rutina!:ElementRef;
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
