import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './components/home/home';
import { LostItems } from './pages/lost-items/lost-items';
import { FoundItems } from './pages/found-items/found-items';
import { ReportItem } from './pages/report-item/report-item';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Register } from './pages/register/register';
import { Location } from './pages/location/location';
import { AuthGuard } from './guards/auth-guard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard},
  { path: 'lost-items', component: LostItems, canActivate: [AuthGuard] },
  { path: 'found-items', component: FoundItems, canActivate: [AuthGuard] },
  { path: 'report-item', component: ReportItem, canActivate: [AuthGuard] },
  { path: 'contact', component: Contact, canActivate: [AuthGuard]},
  { path: 'location', component: Location, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}