import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { IconComponent } from './icon/icon.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TermCardComponent } from './term-card/term-card.component';
import { TermDetailComponent } from './term-detail/term-detail.component';
import { SessionCardComponent } from './session-card/session-card.component';

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
