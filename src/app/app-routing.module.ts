import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { TermDetailComponent } from './components/term-detail/term-detail.component';

const routes: Routes = [
  { path: '', component: TarjetasComponent },
  { path: 'term-detail/:id', component: TermDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
