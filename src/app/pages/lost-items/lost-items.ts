import { Component, OnInit} from '@angular/core';
import { ItemService } from '../../services/item';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-lost-items',
  imports: [CommonModule,FormsModule],
  templateUrl: './lost-items.html',
  styleUrl: './lost-items.css'
})
export class LostItems  implements OnInit{
  successMessage = '';
  errorMessage = '';
  pageTitle='';
  searchItemName='';
  selectedLocationId:any;
  items: any[] = [];
locations: any[] = [];
  constructor(private itemService: ItemService,  
              private locationService: LocationService, 
              private cdr: ChangeDetectorRef
) {}

    ngOnInit(): void {
    this.loadLostItems();
    this.loadLocations();
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
    this.selectedLocationId
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
