import { Component, OnInit} from '@angular/core';
import { ItemService } from '../../services/item';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-found-items',
  imports: [CommonModule,FormsModule],
  templateUrl: './found-items.html',
  styleUrl: './found-items.css'
})
export class FoundItems implements OnInit  {
  items: any[] = [];
  successMessage = '';
  errorMessage = '';
  pageTitle='';
    searchItemName='';
  selectedLocationId:any;
  locations: any[] = [];

    constructor(private itemService: ItemService, 
                    private locationService: LocationService, 
      private cdr: ChangeDetectorRef
) {}

    ngOnInit(): void {
    this.loadFoundItems();
    this.loadLocations();
  }
  loadLocations(): void {
  this.locationService.getAllLocations().subscribe({
    next: (data: any) => {
      this.locations = data.detail || [];
    },
    error: (err) => {
      console.error(err);
    }
  });
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

  searchItems(): void {
  console.log("location"+this.selectedLocationId);
  if(this.selectedLocationId===''){
    this.selectedLocationId=null;
  }
   if(this.selectedLocationId===""){
    this.selectedLocationId=null;
  }
  this.itemService.searchItems(
    this.searchItemName,
    this.selectedLocationId,
    'FOUND'
  ).subscribe({
    next: (data: any) => {
      this.items = data.detail || [];
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
    }
  });
}


resetFilters(): void {

  this.searchItemName = '';
  this.selectedLocationId = '';

  this.ngOnInit();

}

}