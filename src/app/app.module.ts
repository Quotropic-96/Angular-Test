import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { IconComponent } from './components/icon/icon.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TermCardComponent } from './components/term-card/term-card.component';
import { TermDetailComponent } from './views/term-detail/term-detail.component';
import { SessionCardComponent } from './components/session-card/session-card.component';
import { ButtonComponent } from './components/button/button.component';
import { BeforeStartComponent } from './views/before-start/before-start.component';
import { MenuService } from './services/menu-service/menu.service';
import { MenuComponent } from './components/menu/menu.component';
import { MockApiService } from './services/api-mock-service/mock-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IconComponent,
    NavbarComponent,
    TermCardComponent,
    TermDetailComponent,
    SessionCardComponent,
    ButtonComponent,
    BeforeStartComponent,
    MenuComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [MenuService, MockApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
