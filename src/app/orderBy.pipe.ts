import {Pipe, PipeTransform} from '@angular/core';

import { Hero } from './hero'; 


@Pipe({name : 'orderBy'})
export class OrderBy implements PipeTransform{
    
    
    static _orderByComparator(a:any, b:any):number{
        
        if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
        //Isn't a number so lowercase the string to properly compare
        if(a.toLowerCase() < b.toLowerCase()) return -1;
        if(a.toLowerCase() > b.toLowerCase()) return 1;
        }
        else{
        //Parse strings as numbers to compare properly
        if(parseFloat(a) < parseFloat(b)) return -1;
        if(parseFloat(a) > parseFloat(b)) return 1;
        }
        
        return 0; //equal each other
    }

    transform(input : Hero[], property : string, order : string) : Hero[]{
        if (input !== undefined && input.length > 0){
            if (!property){
                property = 'id';
            } else{
                let aux = new Hero();
                let array = Object.getOwnPropertyNames(aux);
                if (array.indexOf(property) < 0){
                    console.error(`The property ${property} is not in Hero class`);
                    return null;
                }
            }

            if (!order)
                order = 'desc';

            return input.sort(function(a:any, b:any){
                return (order == 'desc') ? -OrderBy._orderByComparator(a[property], b[property])
                    : OrderBy._orderByComparator(a[property], b[property]);
            });
        }
    }
}