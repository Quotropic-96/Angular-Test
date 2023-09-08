import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { TermDetailComponent } from './views/term-detail/term-detail.component';
import { BeforeStartComponent } from './views/before-start/before-start.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'term-detail/:id', component: TermDetailComponent },
  { path: 'start-session/:id', component: BeforeStartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
