import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { IconComponent } from './components/icon/icon.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TermCardComponent } from './components/term-card/term-card.component';
import { TermDetailComponent } from './components/term-detail/term-detail.component';
import { SessionCardComponent } from './components/session-card/session-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TarjetasComponent,
    IconComponent,
    NavbarComponent,
    TermCardComponent,
    TermDetailComponent,
    SessionCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
