import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../services/carreras.service';
import { Carrera } from '../models/Carrera';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    public nombre_usuario: string = '';

    public ngOnInit(): void {

        if( localStorage.getItem('usuario') ) {

            this.nombre_usuario = JSON.parse( localStorage.getItem('usuario') || '' ).nombre_usuario;

        }

    }

}
