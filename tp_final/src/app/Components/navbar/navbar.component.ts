import { Component,ViewChild,ElementRef } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public isLogged: string | null = '';
  public isOpen: boolean = false;
  @ViewChild('menuBtn')menuBtn!:ElementRef;
  @ViewChild('userBtn')userBtn!:ElementRef;
  @ViewChild('menu')menu!:ElementRef;

  constructor(private servicioUsuario: UsuarioService) {
    this.isLogged = servicioUsuario.checkLoggedIn();
  }

  toggleMenu() {
    if(this.isOpen) {
      this.menuBtn.nativeElement.classList.remove("open");
      this.userBtn.nativeElement.classList.remove("hidden");
      this.menu.nativeElement.classList.remove("show");
      this.isOpen = false;
    }else{
      this.menuBtn.nativeElement.classList.add("open");
      this.userBtn.nativeElement.classList.add("hidden");
      this.menu.nativeElement.classList.add("show");
      this.isOpen = true;
    }
  }



}
