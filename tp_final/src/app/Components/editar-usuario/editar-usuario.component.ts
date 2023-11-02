import { Component,ViewChild,ElementRef } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  
  user = this.servicioUsuario.getUser(Number(this.servicioUsuario.checkLoggedIn()));
  userName: string = '';
  userLastname: string = '';
  userEmail: string = '';
  userPass: string = '';

  @ViewChild('modifyResult')modifyResult!:ElementRef;


constructor(private servicioUsuario: UsuarioService, private servicioJson: JSONService) {}




  editarUsuario() {
    const log = this.servicioUsuario.checkLoggedIn();
    if(log !== null) {
      const user = this.servicioUsuario.getUser(Number(log));
      console.log(user);
      if(user) {
        if(this.userName.length > 0 ) {
          user.name=this.userName;
        }
        if(this.userLastname.length > 0 ) {
          user.lastName=this.userLastname;
        }
        if(this.userEmail.length > 0 ) {
          user.email=this.userEmail;
        }
        if(this.userPass.length > 0 ) {
          user.passWord=this.userPass;
        }
        
        this.servicioJson.putUser(user);
          console.log("Actualizando..");
          //this.router.navigate(['inicio']);
          const h5 = document.createElement("h5");
          h5.textContent = "editado exitosamente!";
          //const text = document.createTextNode("Logeado exitosamente!");
          this.modifyResult.nativeElement.appendChild(h5);
      }
    }

}}
