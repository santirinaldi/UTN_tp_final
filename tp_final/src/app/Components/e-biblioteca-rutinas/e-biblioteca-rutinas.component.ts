import { Component,ViewChild,ElementRef,OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { BibliotecaRecetas } from 'src/app/Models/biblioteca-recetas';
import { Usuario } from 'src/app/Models/usuario';
import { JSONService } from 'src/app/services/JSON/json.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-e-biblioteca-rutinas',
  templateUrl: './e-biblioteca-rutinas.component.html',
  styleUrls: ['./e-biblioteca-rutinas.component.css']
})
export class EBibliotecaRutinasComponent implements OnInit {
  @Input () nombreRutina: string = '';
  @Input () descripcionRutina: string = '';
  @Output () editarDescripcionLista: EventEmitter<string>= new EventEmitter();
  @Output () editarNombreLista: EventEmitter<string>= new EventEmitter();
  ngOnInit(): void {
  }

    
  
  editarNombreRutina (){
    console.log(this.nombreRutina);
    this.editarNombreLista.emit(this.nombreRutina);
  }

  editarDescripcionRutina (){
    console.log(this.descripcionRutina);
    this.editarDescripcionLista.emit(this.descripcionRutina);
  }
  


}