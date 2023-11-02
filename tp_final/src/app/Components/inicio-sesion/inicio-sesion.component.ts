import { Component,ViewChild,ElementRef } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  userEmail: string = '';
  userPass: string = '';
  @ViewChild('loginresult')loginResult!:ElementRef;

  constructor(private servicioUsuario: UsuarioService) {}

  verifyUser() {
    let user = new Usuario();
    user.email = this.userEmail;
    user.passWord = this.userPass;
    
    
    
    let userID = this.buscarUsuario(user);
    console.log(userID);
    if(userID !== -1) {
      localStorage.setItem("userLoggedin", `${userID}`);
      const h5 = document.createElement("h5");
      h5.textContent = "Logeado exitosamente!";
      //const text = document.createTextNode("Logeado exitosamente!");
      this.loginResult.nativeElement.appendChild(h5);
    }
    else { console.log("No encontrado", userID); }
  }

  buscarUsuario(userBuscado:Usuario) {
    
    let userList = this.servicioUsuario.getUsers();
    console.log(userList);
    let userID = -1;

    userList.forEach((user) => {
      console.log(user.passWord);
      if(user.passWord == userBuscado.passWord && user.email == userBuscado.email) {
        console.log("encontro");
        userID = user.id;
      }
    });

    return userID;
  }

}
