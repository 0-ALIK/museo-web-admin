import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule } from "@angular/forms";



@NgModule({
    declarations: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        MenubarModule,
        InputTextModule,
        FormsModule
    ],
    exports: [
        MenuComponent
    ]
})
export class SharedModule { }
