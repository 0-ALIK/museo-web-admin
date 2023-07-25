import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';
import { Carrera } from '../models/Carrera';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {


    public constructor( private carrerasService: CarrerasService,
        private usuariosService: UsuariosService ) {}

    public ngOnInit(): void { }

    test(): void {
    }

}
