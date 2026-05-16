import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UserComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  users: any[] = [];

  showForm = false;
  isEditMode = false;
  selectedUserId: number | null = null;

  user = {
    id: '',
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    password: '',
    roles: 'USER'
  };

  successMessage = '';
  errorMessage = '';

  constructor(private userService: UserService
) {

}

  ngOnInit(): void {
    this.loadUsers();
  }

loadUsers(): void {
  this.userService.getAllUsers().subscribe({
    next: (data: any) => {
      this.users = [...(data.detail || [])];

      setTimeout(() => {
        this.cdr.detectChanges();
      });
    },
    error: (err) => {
      console.log(err);
    }
  });
}

  openCreateForm(): void {
    this.resetForm();
    this.showForm = true;
  }

  editUser(selectedUser: any): void {
    this.showForm = true;
    this.isEditMode = true;
    this.selectedUserId = selectedUser.id;

    this.user = {
      id: selectedUser.id || '',
      userName: selectedUser.userName || '',
      email: selectedUser.email || '',
      firstName: selectedUser.firstName || '',
      lastName: selectedUser.lastName || '',
      phoneNumber: selectedUser.phoneNumber || '',
      address: selectedUser.address || '',
      password: '',
      roles: selectedUser.role || 'USER'
    };
  }

  submitUser(): void {
    this.successMessage = '';
    this.errorMessage = '';
       
    if (this.isEditMode) {
      this.userService.updateUser(this.user).subscribe({
        next: () => {
          this.successMessage = 'User updated successfully';
          this.resetForm();
          this.loadUsers();
        },
        error: () => {
          this.errorMessage = 'Failed to update user';
        }
      });
    } else {
      this.userService.createUser(this.user).subscribe({
        next: () => {
          this.successMessage = 'User created successfully';
          this.resetForm();
          this.loadUsers();
        },
        error: () => {
          this.errorMessage = 'Failed to create user';
        }
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.successMessage = 'User deleted successfully';
          this.users = this.users.filter(user => user.id !== id);
        },
        error: () => {
          this.errorMessage = 'Failed to delete user';
        }
      });
    }
  }

  resetForm(): void {
    this.showForm = false;
    this.isEditMode = false;
    this.selectedUserId = null;

    this.user = {
      id: '',
      userName: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      password: '',
      roles: 'USER'
    };
  }
}