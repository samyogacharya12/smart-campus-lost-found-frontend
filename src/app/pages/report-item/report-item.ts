import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item';
import { ChangeDetectorRef } from '@angular/core';
import { LocationService } from '../../services/location';
@Component({
  selector: 'app-report-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './report-item.html',
  styleUrl: './report-item.css',
})
export class ReportItem implements OnInit {
  itemName = '';
  description = '';
  itemType = 'LOST';
  locationId!: number;
  categoryId!: number;
  // Messages
  successMessage = '';
  errorMessage = '';
  locations: any[] = [];
  categories: any[] = [];
  // Item List
  items: any[] = [];
  // Role
  role = '';
  username = '';
  // Loading
  isLoading = false;
  showForm: boolean = false;

  constructor(private itemService: ItemService,
              private locationService: LocationService, 
              private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    // Get role from localStorage
    this.role = localStorage.getItem('role') || '';

    // Get username from localStorage
    this.username = localStorage.getItem('username') || '';

    console.log('Role:', this.role);
    console.log('Username:', this.username);

    this.loadItems();
    this.loadLocations();
  }

    loadItems(): void {

    this.isLoading = true;

    // ADMIN → get all items
    if (this.role === 'ADMIN') {

      this.itemService.getAllItems().subscribe({
        next: (data:any) => {

          this.items = data.detail || [];

          this.isLoading = false;
          this.cdr.detectChanges(); // force UI update
        this.closeForm();
        },
        error: (error:any) => {

          console.log(error);

          this.isLoading = false;
        }
      });
    } else{
      this.itemService.getAllItemsByUser().subscribe({
        next: (data:any) => {

          this.items = data.detail || [];

          this.isLoading = false;
          this.cdr.detectChanges(); // force UI update
        this.closeForm();
        },
        error: (error:any) => {
          console.log(error);
          this.isLoading = false;
        }
      }); 
    }
  }

  loadLocations(): void {

  this.locationService.getAllLocations().subscribe({

    next: (data: any) => {

      this.locations = data.detail || [];
    },

    error: (error: any) => {
      console.log(error);
    }
  });
}

   toggleForm(): void {
  this.showForm = !this.showForm;
}

openForm(): void {
  this.showForm = true;
}

closeForm(): void {
  this.showForm = false;
}

    submitItem(): void {

    const item = {

      title: this.itemName,
      description: this.description,
      itemType: this.itemType,

      locationId: this.locationId,
      categoryId: this.categoryId
    };

    this.itemService.reportItem(item).subscribe({

      next: () => {

        this.successMessage = 'Item reported successfully';
        this.errorMessage = '';

        // Refresh items
        this.loadItems();

        // Reset form
        this.itemName = '';
        this.description = '';
        this.itemType = 'LOST';
      },

      error: (error) => {

        console.log(error);

        this.errorMessage = 'Failed to report item';
        this.successMessage = '';
      }
    });
  }

  deleteItem(id: number): void {

    this.itemService.deleteItem(id).subscribe({

      next: () => {

        this.loadItems();
      },

      error: (error) => {

        console.log(error);
      }
    });
  }

}
