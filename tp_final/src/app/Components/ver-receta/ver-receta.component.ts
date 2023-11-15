import { Component,ViewChild,ElementRef,OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Lista } from 'src/app/Models/lista';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.component.html',
  styleUrls: ['./ver-receta.component.css']
})
export class VerRecetaComponent implements OnInit {
  protected user: Usuario= new Usuario();
  @Input()recetaActual?: Lista;
  constructor (private servicioUsuario: UsuarioService){}

    
  
    @ViewChild('receta')rutina!:ElementRef;
    @ViewChild('popupItem')popupItem!:ElementRef;
    
  
  
    ngOnInit(): void {
      
        
      };
    }  