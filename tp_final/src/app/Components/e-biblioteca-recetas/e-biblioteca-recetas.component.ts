import { Component,ViewChild,ElementRef,OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-e-biblioteca-recetas',
  templateUrl: './e-biblioteca-recetas.component.html',
  styleUrls: ['./e-biblioteca-recetas.component.css']
})
export class EBibliotecaRecetasComponent implements OnInit {
  @Output () editarNombreLista: EventEmitter<string>= new EventEmitter();
  ngOnInit(): void {
  }

  nombreReceta: string = '';  
  editarNombreReceta (){
    console.log(this.nombreReceta);
    this.editarNombreLista.emit(this.nombreReceta);
  }

}
