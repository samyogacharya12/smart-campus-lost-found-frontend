import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item';
import { ChangeDetectorRef } from '@angular/core';
import { LocationService } from '../../services/location';
import { CategoryService } from '../../services/category';
@Component({
  selector: 'app-report-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './report-item.html',
  styleUrl: './report-item.css',
})
export class ReportItem implements OnInit {
  itemName = '';
  selectedFile!: File;
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
              private categoryService: CategoryService,
              private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    // Get role from localStorage
    this.role = localStorage.getItem('role') || '';

    // Get username from localStorage
    this.username = localStorage.getItem('username') || '';


    this.loadItems();
    this.loadLocations();
    this.loadCategories();
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

  onFileSelected(event: any): void {

  this.selectedFile = event.target.files[0];

}

  loadCategories():void{
    this.categoryService.getAllCategories().subscribe({
     next: (data: any)=>{
      this.categories=data.detail || [];
     },
     error:(error:any)=>{
      console.log(error);
     }
    });
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


      const formData = new FormData();

  formData.append('title', this.itemName);
  formData.append('itemType', this.itemType);
  formData.append('description', this.description);
  formData.append('locationId', this.locationId.toString());
  formData.append('categoryId', this.categoryId.toString());

  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }

    this.itemService.reportItem(formData).subscribe({

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
