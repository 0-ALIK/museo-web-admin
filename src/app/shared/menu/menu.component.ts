import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SearchMenuService } from 'src/app/services/search-menu.service';

@Component({
    selector: 'shared-menu',
    templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

    public items: MenuItem[] | undefined;

    public termino: string = "";

    public constructor ( private searchMenuService: SearchMenuService ) {}

    public ngOnInit(): void {
        this.items = [
            {
                label: 'Articulos',
                icon: 'pi pi-camera',
                routerLink: ['/home', 'articulos']
            },
            {
                label: 'Usuarios',
                icon: 'pi pi-users',
                routerLink: ['/home', 'usuarios']
            },
            {
                label: 'Categorias',
                icon: 'pi pi-tags',
                routerLink: ['/home', 'categorias']
            },
            {
                label: 'Facultades',
                icon: 'pi pi-building',
                routerLink: ['/home', 'facultades']
            },
            {
                label: 'Carreras',
                icon: 'pi pi-book',
                routerLink: ['/home', 'carreras']
            },
            {
                label: 'cerrar sesión',
                icon: 'pi pi-power-off',
                command: () => this.cerrarSesion()
            }
        ];
    }

    public onInputChange(): void {
        this.searchMenuService.termino = this.termino.trim();
    }

    public onEnterPressed(): void {
        if(this.termino.trim().length < 2)
            return;
        this.searchMenuService.desencadenarBusqueda();
    }

    private cerrarSesion(): void {
        console.log(' Cerrando sesión... ');
    }

}
