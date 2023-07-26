import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingPageComponent
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule ),
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( module => module.HomeModule ),
        canActivate: [authGuard]
    }
];

@NgModule({
  	imports: [ RouterModule.forRoot( routes ) ],
  	exports: [ RouterModule ]
})
export class AppRoutingModule { }
