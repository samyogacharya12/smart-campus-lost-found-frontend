import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { HowItWorks } from './components/how-it-works/how-it-works';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Home, HowItWorks],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('smart-campus-lost-found-frontend');
}
