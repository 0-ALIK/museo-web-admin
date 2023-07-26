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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CreateCarreraComponent } from './components/create-carrera/create-carrera.component';
import { CreateCategFacultComponent } from './components/create-categ-facult/create-categ-facult.component';
import { UsuariosTableComponent } from './components/usuarios-table/usuarios-table.component';
import { ArticulosTableComponent } from './components/articulos-table/articulos-table.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormArticulosComponent } from './components/form-articulos/form-articulos.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';



@NgModule({
    declarations: [
        HomeComponent,
        VerComponent,
        EditComponent,
        CarrerasTableComponent,
        CategFacultTableComponent,
        CreateCarreraComponent,
        CreateCategFacultComponent,
        UsuariosTableComponent,
        ArticulosTableComponent,
        FormArticulosComponent
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
        InputTextModule,
        ConfirmPopupModule,
        ReactiveFormsModule,
        InputNumberModule,
        EditorModule,
        FileUploadModule,
        CheckboxModule
    ]
})
export class HomeModule { }
