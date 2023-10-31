import { Component,ViewChild,ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cierre-sesion',
  templateUrl: './cierre-sesion.component.html',
  styleUrls: ['./cierre-sesion.component.css']
})
export class CierreSesionComponent {
  router: any;
  
  constructor(private servicioUsuario: UsuarioService){}


onLogout (): void{
  this.servicioUsuario.logOut();
}

ngOnInit(): void {
  if(this.servicioUsuario.verifyLogged()){
    this.router.navigate(['inicio']);
  }
}}
