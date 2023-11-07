import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit{
  userEmail: string = '';
  userPass: string = '';
  userList: Usuario[] = [];
  @ViewChild('loginresult') loginResult!: ElementRef;

  constructor(private servicioUsuario: UsuarioService, private jsonService: JSONService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.jsonService.getAll().subscribe((data: any) => {
      this.userList = data.filter((item:any) => item.baja !== 1);
    });
  }

  verifyUser() {
    console.log(this.userList);
    let user = new Usuario();
    user.email = this.userEmail;
    user.passWord = this.userPass;

    let userID = this.buscarUsuario(user);
    console.log(userID);
    if (userID !== -1) {
      localStorage.setItem('userLoggedin', `${userID}`);
      const h5 = document.createElement('h5');
      h5.textContent = 'Logeado exitosamente!';
      //const text = document.createTextNode("Logeado exitosamente!");
      this.loginResult.nativeElement.appendChild(h5);
      this.router.navigate(['/bibliotecaRecetas']);
      //this.refresh();
    } else {
      console.log('No encontrado', userID);
    }
  }

  buscarUsuario(userBuscado: Usuario) {
    console.log(this.userList);
    let userID = -1;

    this.userList.forEach((user) => {
      console.log(user.passWord);
      if (
        user.passWord == userBuscado.passWord &&
        user.email == userBuscado.email
      ) {
        console.log('encontro');
        userID = user.id;
      }
    });

    return userID;
  }

  refresh(): void {
    window.location.reload();
  }
}
