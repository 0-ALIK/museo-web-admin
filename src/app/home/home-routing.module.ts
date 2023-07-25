import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { VerComponent } from './pages/ver/ver.component';
import { EditComponent } from './pages/edit/edit.component';

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
                path: 'edit/:id',
                component: EditComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
