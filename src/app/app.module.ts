import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastModule,
        MessagesModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
