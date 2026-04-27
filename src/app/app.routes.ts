import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}