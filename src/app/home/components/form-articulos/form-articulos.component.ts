import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { ArticulosService } from 'src/app/services/articulos.service';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
    templateUrl: './form-articulos.component.html',
})
export class FormArticulosComponent implements OnInit, OnDestroy {

    public subs: Subscription[] = [];

    public categorias: Categoria[] = [];

    public form: FormGroup = this.formBuilder.group({
        nombre: [],
        dueno: [],
        ubicacion: [],
        year: [],
        categoria: [],
        descripcion: []
    });

    public constructor(
        private articulosService: ArticulosService,
        private categoriasService: CategoriasService,
        private formBuilder: FormBuilder,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    public ngOnInit(): void {
        const sub = this.categoriasService.getAll().subscribe({
            next: categorias => {
                this.categorias = categorias;
            }
        });

        this.subs.push( sub );
    }

    public ngOnDestroy(): void {
        if(this.subs.length !== 0)
            this.subs.forEach( sub => sub.unsubscribe() );
    }


}
