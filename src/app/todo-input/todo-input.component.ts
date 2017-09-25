import { State } from '../State';
import { selector } from 'rxjs/operator/multicast';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../IItem';

@Component({
    selector: 'todo-input',
    templateUrl: './todo-input.component.html',
    styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent {

    name: String;

    @Input() state: Number;
    @Output() addTodoEE: EventEmitter<String> = new EventEmitter();
    @Output() selectAllEE: EventEmitter<Boolean> = new EventEmitter();

    constructor() {
        this.name = '';
    }

    /**
     * Handle submit input
     */
    onSubmit() {
        if (this.name !== '') {
            this.addTodoEE.emit(this.name);
            this.name = '';
        }
    }

    /**
     * Toggle all select item
     */
    toggleAll() {
        const isAll = this.state === State.None || this.state === State.Partial
            ? true
            : false;
        console.log(this.state);
        this.selectAllEE.emit(isAll);
    }
}
