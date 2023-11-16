import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, ...arg: any): any {
   const resultadoPost= [];
   for(const post of value){
    if(post.nombre.toString().toLowerCase().indexOf(arg.toString().toLowerCase())>-1){
      resultadoPost.push(post);
    }
   }
   return resultadoPost;
  }

}
