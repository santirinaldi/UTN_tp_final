import { Component,ViewChild,ElementRef } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
 
})
export class InicioSesionComponent {
  userEmail: string = '';
  userPass: string = '';
  @ViewChild('loginresult')loginResult!:ElementRef;

  constructor(private servicioUsuario: UsuarioService, private route: ActivatedRoute){}


  verifyUser() {
    let user = new Usuario();
    user.email = this.userEmail;
    user.passWord = this.userPass;
    
    
    
    let userID = this.buscarUsuario(user);
    if(userID != -1) {
      localStorage.setItem("userLoggedin", `${userID}`);
      const h5 = document.createElement("h5");
      h5.textContent = "Logeado exitosamente!";
      //const text = document.createTextNode("Logeado exitosamente!");
      this.loginResult.nativeElement.appendChild(h5);

      //this.router.navigate(['editarUsuario']);
    }
    else { 
      const h5 = document.createElement("h5");
      h5.textContent = "Error!";
      //const text = document.createTextNode("Logeado exitosamente!");
      this.loginResult.nativeElement.appendChild(h5);
      console.log("No encontrado", userID);
    }
  }

  buscarUsuario(userBuscado:Usuario) {
    
    let userList = this.servicioUsuario.getUsers();
    let userID = -1;
    console.log(userList);

    userList.forEach((user) => {
      if(user.passWord === userBuscado.passWord && user.email === userBuscado.email) {
        userID = user.id;
      }
    });

    return userID;
  }


}
