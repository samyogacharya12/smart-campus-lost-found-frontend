import { Component, OnInit} from '@angular/core';
import { ItemService } from '../../services/item';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-found-items',
  imports: [CommonModule],
  templateUrl: './found-items.html',
  styleUrl: './found-items.css'
})
export class FoundItems implements OnInit  {
  items: any[] = [];
  successMessage = '';
  errorMessage = '';
  pageTitle='';
    constructor(private itemService: ItemService,  private cdr: ChangeDetectorRef
) {}

    ngOnInit(): void {
    this.loadFoundItems();
  }

   
  loadFoundItems(): void {
  this.itemService.getItemsByType('FOUND').subscribe({
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