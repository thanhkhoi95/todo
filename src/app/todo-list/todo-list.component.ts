import { selector } from 'rxjs/operator/multicast';
import { Component } from '@angular/core';
import { uuid } from '../utils';
import { IItem } from '../iItem';
import { State } from '../State';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

    items: IItem[];
    checkAllState: Number;
    selectedIds: String[];

    constructor() {
        const items = window.localStorage.getItem('items');
        this.items = items ? JSON.parse(items) : [];
        this.selectedIds = [];
        this.calculateCheckAll();
        console.log(this.items);
    }

    onAddTodo(name) {
        console.log('onAddTodo');
        const id = uuid();
        const newItem: IItem = {
            name: name,
            id: id,
            isSelected: false,
            isDone: false
        };
        this.items = [newItem, ...this.items];
        this.calculateCheckAll();
    }

    onDone(id) {
        const index = this.items.findIndex(it => it.id === id);
        if (index !== -1) {
            const newItem: IItem = Object.assign({}, this.items[index], { isDone: true });
            this.items = [...this.items.slice(0, index), newItem, ...this.items.slice(index + 1)];
            this.calculateCheckAll();
        }
    }

    onDelete(id) {
        const index = this.items.findIndex(it => it.id === id);
        if (index !== -1) {
            this.items = [...this.items.slice(0, index), ...this.items.slice(index + 1)];
            this.calculateCheckAll();
        }
    }

    /**
     * User select multiple items
     */
    onSelect({ id, isSelected }) {
        console.log('select this');
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            const updatedItem = Object.assign({}, this.items[index], { isSelected });
            this.items = [...this.items.slice(0, index), updatedItem, ...this.items.slice(index + 1)];
            this.calculateCheckAll();
        }
    }

    /**
     * Selecte all event handler from input component
     */
    onSelectAll(isAll) {
        if (isAll) {
            this.items = this.items.map(item => item.isSelected ? item : Object.assign({}, item, { isSelected: true }));
        } else {
            this.items = this.items.map(item => item.isSelected ? Object.assign({}, item, { isSelected: false }) : item);
        }
        this.calculateCheckAll();
    }

    /**
     * Remove all selected
     */
    onRemove() {
        this.items = this.items.filter(item => !item.isSelected);
        this.calculateCheckAll();
    }

    /**
     * Clear the selected item
     */
    onClearSelected() {
        this.items = this.items.map(item => item.isSelected ? Object.assign({}, item, { isSelected: false }) : item);
        this.calculateCheckAll();
    }

    /**
     * Undone a task
     */
    onUndoneTask(id) {
        const index = this.items.findIndex(item => item.id === id);
        console.log(index);
        if (index !== -1) {
            const updatedItem = Object.assign({}, this.items[index], { isDone: false });
            this.items = [...this.items.slice(0, index), updatedItem, ...this.items.slice(index + 1)];
            this.synceStorage();
        }
    }

    /**
     * Control the element for angular reuse when ng-repeat
     */
    trackByFn(item: IItem) {
        console.log(this.items);
        return item ? null : item.id;
    }

    /**
     * Calculate check all state
     */
    calculateCheckAll() {
        const selectedItems = this.items.filter(item => item.isSelected);
        if (selectedItems.length === 0) {
            this.checkAllState = State.None;
        } else if (selectedItems.length < this.items.length) {
            this.checkAllState = State.Partial;
        } else {
            this.checkAllState = State.All;
        }
        console.log(this.checkAllState);
        this.synceStorage();
    }

    /**
     * Synce with local storage
     */
    synceStorage() {
        window.localStorage.setItem('items', JSON.stringify(this.items));
        console.log()
    }

}
