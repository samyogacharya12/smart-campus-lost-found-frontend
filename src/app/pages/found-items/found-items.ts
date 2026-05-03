import { Component } from '@angular/core';

@Component({
  selector: 'app-found-items',
  imports: [],
  templateUrl: './found-items.html',
  styleUrl: './found-items.css'
})
export class FoundItems {

  items = [
    {
      name: 'Water Bottle',
      location: 'Student Center',
      date: 'May 1, 2026'
    },
    {
      name: 'Backpack',
      location: 'Engineering Building',
      date: 'May 2, 2026'
    },
    {
      name: 'Keys',
      location: 'Gym',
      date: 'May 3, 2026'
    }
  ];

}