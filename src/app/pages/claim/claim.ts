import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClaimService } from '../../services/claim';
import { Claim } from '../../models/claim';

@Component({
  selector: 'app-claim',
  imports: [CommonModule, FormsModule],
  templateUrl: './claim.html',
  styleUrl: './claim.css'
})
export class ClaimComponent implements OnInit {

  claims: any[] = [];

  claimId: number | null = null;
  itemId!: number;
  userId!: number;
  claimMessage = '';
  status = 'PENDING';

  role = '';
  successMessage = '';
  errorMessage = '';

  showForm = false;

  constructor(private claimService: ClaimService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
    this.userId = Number(localStorage.getItem('userId'));

    this.loadClaims();
  }

  loadClaims(): void {
    if (this.role === 'ADMIN') {
      this.claimService.getAllClaims().subscribe({
        next: (data: any) => {
          this.claims = Array.isArray(data) ? data : data.detail || [];
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.claimService.getMyClaims(this.userId).subscribe({
        next: (data: any) => {
          this.claims = Array.isArray(data) ? data : data.detail || [];
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  submitClaim(): void {
    const claim: Claim = {
      itemId: this.itemId,
      userId: this.userId,
      claimMessage: this.claimMessage,
      status: 'PENDING'
    };

    this.claimService.createClaim(claim).subscribe({
      next: () => {
        this.successMessage = 'Claim submitted successfully';
        this.errorMessage = '';
        this.resetForm();
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

  resetForm(): void {
    this.claimId = null;
    this.itemId = 0;
    this.claimMessage = '';
    this.status = 'PENDING';
    this.showForm = false;
  }
}