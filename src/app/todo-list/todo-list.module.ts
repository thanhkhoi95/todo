import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TodoListComponent } from '../todo-list/todo-list.component';

import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoInputComponent } from '../todo-input/todo-input.component';

import { MdButtonModule, MdCheckboxModule, MdIconModule, MaterialModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdCheckboxModule,
        MdIconModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule
    ],
    declarations: [
        TodoListComponent,
        TodoItemComponent,
        TodoInputComponent
    ],
    exports: [
        TodoListComponent
    ]
})
export class TodoListModule { }
