import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClaimService } from '../../services/claim';
import { Claim } from '../../models/claim';
import { ChangeDetectorRef } from '@angular/core';
import { ItemService } from '../../services/item';

@Component({
  selector: 'app-claim',
  imports: [CommonModule, FormsModule],
  templateUrl: './claim.html',
  styleUrl: './claim.css'
})
export class ClaimComponent implements OnInit {
  selectedFile!: File;
  claims: any[] = [];
  items:any[]=[];  
  claimId: number | null = null;
  itemId?: number | any;
  userId?: number;
  claimMessage = '';
  status = 'PENDING';

  role = '';
  successMessage = '';
  errorMessage = '';

  showForm = false;

  constructor(private claimService: ClaimService,
              private itemService: ItemService, 
            private cdr: ChangeDetectorRef

  ) {}



  
  onFileSelected(event: any): void {

  this.selectedFile = event.target.files[0];

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


  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
    this.userId = Number(localStorage.getItem('userId'));

    this.loadClaims();
    this.loadItems();
  }

  loadItems():void{
    this.itemService.getAllItems().subscribe({
      next: (data:any)=>{
         this.items=data.detail || [];
      },
       error: (error) => {
          console.log(error);
        }
    })
  }

  loadClaims(): void {
    if (this.role === 'ADMIN') {
      this.claimService.getAllClaims().subscribe({
        next: (data: any) => {
          this.claims =  data.detail || [];
          this.cdr.detectChanges(); // force UI update
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.claimService.getAllClaimsByUsers().subscribe({
        next: (data: any) => {
          this.claims = data.detail || [];
          this.cdr.detectChanges(); // force UI update
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  submitClaim(): void {
  const formData = new FormData();

  formData.append('itemId', this.itemId);
  formData.append('claimMessage', this.claimMessage);
  formData.append('status', this.status);
  
  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }
    this.claimService.createClaim(formData).subscribe({
      next: () => {
        this.successMessage = 'Claim submitted successfully';
        this.errorMessage = '';
        this.loadClaims();
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = 'Failed to submit claim';
        this.successMessage = '';
      }
    });
  }

  approveClaim(claimId: number): void {
    this.claimService.approveClaim(claimId).subscribe({
      next: () => {
        this.successMessage = 'Claim approved successfully';
        this.loadClaims();
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = 'Failed to approve claim';
      }
    });
  }

  rejectClaim(claimId: number): void {
    this.claimService.rejectClaim(claimId).subscribe({
      next: () => {
        this.successMessage = 'Claim rejected successfully';
        this.loadClaims();
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = 'Failed to reject claim';
      }
    });
  }

}