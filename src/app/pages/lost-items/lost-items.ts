import { Component, OnInit} from '@angular/core';
import { ItemService } from '../../services/item';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lost-items',
  imports: [CommonModule],
  templateUrl: './lost-items.html',
  styleUrl: './lost-items.css'
})
export class LostItems  implements OnInit{
  successMessage = '';
  errorMessage = '';
  pageTitle='';
  items: any[] = [];

  constructor(private itemService: ItemService,  private cdr: ChangeDetectorRef
) {}

    ngOnInit(): void {
    this.loadLostItems();
  }


  loadLostItems(): void {
  this.itemService.getItemsByType('LOST').subscribe({
    next: (data: any) => {
      this.items = data.detail || [];
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
