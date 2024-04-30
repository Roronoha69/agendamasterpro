import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './Components/user/user.component';
import { AgendaComponent } from './Components/agenda/agenda.component';

const routes: Routes = [
  { path: '', redirectTo: '/agenda', pathMatch: 'full' },
  { path: 'agenda', component: AgendaComponent },
  { path: 'profile', component: UserComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
