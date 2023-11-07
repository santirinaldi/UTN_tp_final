import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';


@Component({
  selector: 'app-biblioteca-recetas',
  templateUrl: './biblioteca-recetas.component.html',
  styleUrls: ['./biblioteca-recetas.component.css']
})
export class BibliotecaRecetasComponent implements OnInit {
  protected user: Usuario= new Usuario();
  constructor (private servicioUsuario: UsuarioService) {
    
  }

  @ViewChild('lista')lista!:ElementRef;
  @ViewChild('popupItem')popupItem!:ElementRef;

  //const user: Usuario ; 
  ngOnInit(): void {
    const log = this.servicioUsuario.checkLoggedIn();

    //const user: Usuario ; 
    const userList = this.servicioUsuario.pedidoAPI();
    this.servicioUsuario.getUser2(1, userList).subscribe((usuario: Usuario)=>{
      console.log(usuario);
      console.log(userList);
      this.user=usuario});
  } 

  
}
