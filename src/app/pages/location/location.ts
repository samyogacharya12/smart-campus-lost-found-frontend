import { Component, OnInit} from '@angular/core';
import { LocationService } from '../../services/location';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-location',
  imports: [CommonModule, FormsModule],
  templateUrl: './location.html',
  styleUrl: './location.css',
})
export class LocationComponent implements OnInit  {
  showForm: boolean = false;
  locations: any[] = [];

  locationName = '';
  description = '';
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private locationService: LocationService,  private cdr: ChangeDetectorRef
) {}

    ngOnInit(): void {
    this.loadLocations();
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


trackByLocationId(index: number, loc: any): number {
  return loc.locationId;
}

    loadLocations(): void {
        this.isLoading = true;
        console.log("page is being called");
    this.locationService.getAllLocations().subscribe({
      next: (data:any) => {
        this.locations = data.detail || [];
        this.isLoading = false;
        this.cdr.detectChanges(); // force UI update
        this.closeForm();

      },
      error: (err) => {
        console.error('Error loading locations', err);
        this.isLoading = false;

      }
    });
  }


  saveLocation(): void {
    const payload = {
      locationName: this.locationName,
      description: this.description
    };

    this.locationService.createLocation(payload).subscribe({
      next: () => {
        this.successMessage = 'Location saved successfully';
        this.errorMessage = '';
        this.locationName = '';
        this.description = '';
        this.ngOnInit();
      },
      error: () => {
        this.errorMessage = 'Failed to save location';
        this.successMessage = '';
      }
    });
  }


}
