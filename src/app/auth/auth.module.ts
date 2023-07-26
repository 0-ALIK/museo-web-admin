import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        CardModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        ButtonModule,
        ToastModule,
        MessagesModule
    ]
})
export class AuthModule { }
