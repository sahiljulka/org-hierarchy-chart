import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  @Input('title') title:string=''
  @Input('designation') designation:string=''
  @Input('email') email:string=''
  @Input('phonenumber') phoneNumber:string=''
  @Input('actions') actions:string[]=[]

  @Output('cardActionSelected') cardActionSelected= new EventEmitter<string>();

  onClick(action:string){
    this.cardActionSelected.emit(action)
  }
}
