import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { SearchMenuService } from 'src/app/services/search-menu.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
    selector: 'app-usuarios-table',
    templateUrl: './usuarios-table.component.html',
    providers: [ MessageService ]
})
export class UsuariosTableComponent implements OnInit, OnDestroy {

    public usuarios: Usuario[] = [];

    public subs: Subscription[] = [];

    public constructor(
        private usuarioService: UsuariosService,
        private searchMenuService: SearchMenuService,
        private messageService: MessageService,
    ) {}

    public ngOnInit(): void {

        const sub = this.usuarioService.getAll().subscribe({
            next: usuarios => {
                this.usuarios = usuarios;
            }
        });

        const sub2 = this.searchMenuService.realizarBusqueda().subscribe({
            next: termino => {
                this.buscarByName( termino );
            }
        });

        this.subs.push( sub );
        this.subs.push( sub2 );
    }

    public buscarByName( termino: string ) {
        const sub = this.usuarioService.getAll( termino ).subscribe({
            next: usuarios => {
                this.usuarios = usuarios;
            }
        });

        this.subs.push( sub );
    }

    public OnClickEliminar( id:number, button: Button ): void {
        button.loading = true;


        const sub = this.usuarioService.deleteUsuario( id ).subscribe({
            next: usuarioRes => {
                this.usuarios = this.usuarios.filter( usuario => usuario.id !== usuarioRes.id );
                this.messageService.add({
                    severity: 'success',
                    summary: 'Borrado',
                    detail: usuarioRes.nombre
                });
                button.loading = false;
            }
        });


        this.subs.push( sub );
    }

    public ngOnDestroy(): void {
        if(this.subs.length !== 0)
            this.subs.forEach( sub => sub.unsubscribe() );
    }

}
