import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  loggedInStatus!: Number;
  userLogged!: Usuario;
public isLogged: string | null = '';
  public isOpen: boolean = false;
  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild('userBtn') userBtn!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    private servicioUsuario: UsuarioService,
    private loginService: LoginService,
    private jsonService: JSONService
  ) {}

  ngOnInit(): void {
this.isLogged = this.servicioUsuario.checkLoggedIn();

    this.loginService.getisLoggedIn().subscribe((value) => {
      this.loggedInStatus = value;
    });
  }

  ngOnDestroy(): void {}

  toggleMenu() {
    if (this.isOpen) {
      this.menuBtn.nativeElement.classList.remove('open');
      this.userBtn.nativeElement.classList.remove('hidden');
      this.menu.nativeElement.classList.remove('show');
      this.isOpen = false;
    } else {
      this.menuBtn.nativeElement.classList.add('open');
      this.userBtn.nativeElement.classList.add('hidden');
      this.menu.nativeElement.classList.add('show');
      this.isOpen = true;
    }
  }
}
