import { Component,ViewChild,ElementRef,OnInit, Input} from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/Models/usuario';
import { Lista } from 'src/app/Models/lista';

@Component({
  selector: 'app-ver-rutina',
  templateUrl: './ver-rutina.component.html',
  styleUrls: ['./ver-rutina.component.css']
})
export class VerRutinaComponent implements OnInit {
  protected user: Usuario= new Usuario();
  @Input()rutinaActual?: Lista;
  constructor (private servicioUsuario: UsuarioService){}

    
  
    @ViewChild('rutina')rutina!:ElementRef;
    @ViewChild('popupItem')popupItem!:ElementRef;
    
  
  
    ngOnInit(): void {
      
        
      };
    }  


