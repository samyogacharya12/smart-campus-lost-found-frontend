import { Component } from '@angular/core';
import { LocationService } from '../../services/location';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-location',
  imports: [CommonModule, FormsModule],
  templateUrl: './location.html',
  styleUrl: './location.css',
})
export class Location {


  locationName = '';
  description = '';
  successMessage = '';
  errorMessage = '';

  constructor(private locationService: LocationService) {}

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
      },
      error: () => {
        this.errorMessage = 'Failed to save location';
        this.successMessage = '';
      }
    });
  }


}
