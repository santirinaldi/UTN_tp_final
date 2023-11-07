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
    /*const userList;
    this.servicioUsuario.pedidoAPI().subscribe(
      (data: any) => {
        this.userList = data;
      }
    );*/
    this.servicioUsuario.getUser2(1).subscribe((usuario: Usuario)=>{
      console.log(usuario);
      this.user=usuario
      console.log(this.user);
      
    });
  } 

  
}
