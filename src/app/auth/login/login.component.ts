import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Subject, Subscription, catchError, takeUntil, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService]
})
export class LoginComponent implements OnDestroy{

    public subs: Subscription[] = [];

    public nombre_usuario: string | undefined;

    @ViewChild('button')
    public button!: Button

    public loading: boolean = false;

    public password: string | undefined;

    public constructor (
        private authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {}

    public buttonDisabled(): boolean {
        if(this.nombre_usuario && this.password) {

            const nombre = this.nombre_usuario.trim();
            const pass = this.password.trim();

            return nombre.length === 0 || pass.length === 0 ? true : false;
        }

        return true;
    }

    public submit( ): void {
        if(!this.nombre_usuario || !this.password) return;

        this.loading = true;
        const nombre = this.nombre_usuario.trim();
        const pass = this.password.trim();

        this.authService.login( nombre, pass ).pipe(
            catchError((error) => {
                this.loading = false;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
                return throwError( () => error );
            })
        ).subscribe({
            next: response => {
                this.loading = false;
                localStorage.setItem('token', response.token );
                localStorage.setItem('usuario', JSON.stringify(response.usuario) );
                this.router.navigate(['/home']);
            }
        });
    }

    public ngOnDestroy(): void {
        if( this.subs.length !== 0 )
            this.subs.forEach( sub => sub.unsubscribe() );
    }
}
