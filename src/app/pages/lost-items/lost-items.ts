import { Component } from '@angular/core';

@Component({
  selector: 'app-lost-items',
  imports: [],
  templateUrl: './lost-items.html',
  styleUrl: './lost-items.css'
})
export class LostItems {
  items = [
    {
      name: 'Laptop',
      location: 'Library',
      date: 'May 1, 2026'
    },
    {
      name: 'Wallet',
      location: 'Cafeteria',
      date: 'May 2, 2026'
    },
    {
      name: 'Phone',
      location: 'Parking Lot',
      date: 'May 3, 2026'
    },

    {
      name: 'AirPods',
      location: 'Gym',
      date: 'May 4, 2026'
    },
  ];
}
