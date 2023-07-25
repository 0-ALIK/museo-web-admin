import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { VerComponent } from './pages/ver/ver.component';
import { EditComponent } from './pages/edit/edit.component';
import { SharedModule } from '../shared/shared.module';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CarrerasTableComponent } from './components/carreras-table/carreras-table.component';
import { CategFacultTableComponent } from './components/categ-facult-table/categ-facult-table.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CreateCarreraComponent } from './components/create-carrera/create-carrera.component';
import { CreateCategFacultComponent } from './components/create-categ-facult/create-categ-facult.component';
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';



@NgModule({
    declarations: [
        HomeComponent,
        VerComponent,
        EditComponent,
        CarrerasTableComponent,
        CategFacultTableComponent,
        CreateCarreraComponent,
        CreateCategFacultComponent,
        UsuariosTableComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ButtonModule,
        SharedModule,
        DividerModule,
        TableModule,
        DropdownModule,
        FormsModule,
        CardModule,
        ToastModule,
        MessagesModule,
        DynamicDialogModule,
        InputTextModule
    ]
})
export class HomeModule { }
