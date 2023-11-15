import { Component,ViewChild,ElementRef,OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-e-biblioteca-recetas',
  templateUrl: './e-biblioteca-recetas.component.html',
  styleUrls: ['./e-biblioteca-recetas.component.css']
})
export class EBibliotecaRecetasComponent implements OnInit {
  @Input () nombreReceta: string = '';
  @Input () descripcionReceta: string = '';
  @Output () editarDescripcionLista: EventEmitter<string>= new EventEmitter();
  @Output () editarNombreLista: EventEmitter<string>= new EventEmitter();
  ngOnInit(): void {
  }

    
  
  editarNombreReceta (){
    console.log(this.nombreReceta);
    this.editarNombreLista.emit(this.nombreReceta);
  }

  editarDescripcionReceta (){
    console.log(this.descripcionReceta);
    this.editarDescripcionLista.emit(this.descripcionReceta);
  }
  

}
