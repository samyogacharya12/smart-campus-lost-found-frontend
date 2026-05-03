import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { LostItems } from './pages/lost-items/lost-items';
import { FoundItems } from './pages/found-items/found-items';
import { ReportItem } from './pages/report-item/report-item';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'lost-items', component: LostItems },
  { path: 'found-items', component: FoundItems },
  { path: 'report-item', component: ReportItem },
  { path: 'contact', component: Contact }
];