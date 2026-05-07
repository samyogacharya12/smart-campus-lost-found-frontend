import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit {

  categories: any[] = [];

  categoryId: number | null = null;
  categoryName = '';
  description = '';

  successMessage = '';
  errorMessage = '';

  showForm = false;
  isEditMode = false;

  constructor(private categoryService: CategoryService,
        private cdr: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data.detail || [];
                  this.cdr.detectChanges(); // force UI update

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;

    if (!this.showForm) {
      this.resetForm();
    }
  }

  saveCategory(): void {
    const category = {
      categoryId: this.categoryId, 
      categoryName: this.categoryName,
      description: this.description
    };

    if (this.isEditMode && this.categoryId) {
      this.categoryService.updateCategory(category).subscribe({
        next: () => {
          this.successMessage = 'Category updated successfully';
          this.resetForm();
          this.loadCategories();
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = 'Failed to update category';
        }
      });
    } else {
      this.categoryService.createCategory(category).subscribe({
        next: () => {
          this.successMessage = 'Category created successfully';
          this.resetForm();
          this.loadCategories();
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = 'Failed to create category';
        }
      });
    }
  }

  editCategory(category: any): void {
    this.showForm = true;
    this.isEditMode = true;

    this.categoryId = category.categoryId;
    this.categoryName = category.categoryName;
    this.description = category.description;
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.successMessage = 'Category deleted successfully';
        this.loadCategories();
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = 'Failed to delete category';
      }
    });
  }

  resetForm(): void {
    this.categoryId = null;
    this.categoryName = '';
    this.description = '';
    this.showForm = false;
    this.isEditMode = false;
  }


openForm(): void {
  this.showForm = true;
}

closeForm(): void {
  this.showForm = false;
}
}