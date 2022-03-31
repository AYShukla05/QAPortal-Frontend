import { EventEmitter, Injectable, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class HeaderService {
    searchQuery: string = ''
    @Output() dataChanged = new BehaviorSubject('')
    constructor(){}
    setSearchQuery(query: string){
        this.searchQuery = query
        this.dataChanged.next(this.searchQuery)
    }
   
}