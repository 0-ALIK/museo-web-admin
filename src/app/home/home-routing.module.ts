import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { VerComponent } from './pages/ver/ver.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/home/articulos'
            },
            {
                path: ':tipo',
                component: VerComponent
            },
            {
                path: '**',
                redirectTo: '/'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
