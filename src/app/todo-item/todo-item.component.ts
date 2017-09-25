import { selector } from 'rxjs/operator/multicast';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IItem } from '../IItem';

@Component({
    selector: 'todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

    @Input() item: IItem;
    @Output() doneEE: EventEmitter<String> = new EventEmitter();
    @Output() deleteEE: EventEmitter<String> = new EventEmitter();
    @Output() checkEE: EventEmitter<{}> = new EventEmitter();
    @Output() undoneEE: EventEmitter<String> = new EventEmitter();

    isShowControl: Boolean;
    isChecked: Boolean;

    constructor() {
        this.isShowControl = false;
    }

    ngOnInit() {
        console.log(this.item);
        this.isChecked = this.item ? this.item.isSelected : false;
    }

    /**
     * Show the control action when user hover the item
     */
    onHoverIn() {
        this.isShowControl = true;
    }

    /**
     * Hide the control action when user leave the item
     */
    onHoverOut() {
        this.isShowControl = false;
    }

    /**
     * Emit event to the parent when user click to the done button
     */
    onDoneClick() {
        this.doneEE.emit(this.item.id);
    }

    /**
     * Emit event to the parent when user click to the delete button
     */
    onClearClick() {
        this.deleteEE.emit(this.item.id);
    }

    /**
     * Emit event to the parent when user select multiple item
     */
    onSelected() {
        console.log('select this 0');
        this.checkEE.emit({
            id: this.item.id,
            isSelected: !this.isChecked
        });
    }

    /**
     * Emit event to undo the done item
     */
    onUndo() {
        this.undoneEE.emit(this.item.id);
    }

}
