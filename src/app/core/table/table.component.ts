import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableService } from './table.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  form: FormGroup|any; // Form group for user input
  users: any[] = []; // Array to hold user data
  updating: boolean = false; // Flag to indicate if the user is being updated
  userIdToUpdate: string | null = null; // ID of the user being updated
  loading: boolean = true; // Flag to indicate loading state
  displayDialog: boolean = false; // Flag to control display of the edit user dialog
  pdfdisplay: boolean = false; // Flag to control display of the PDF dialog
  pdfdetails: any = {}; // Object to hold PDF details
  originalUsers: any[] = []; // Array to hold the original list of users

  constructor(
    private fb: FormBuilder, // FormBuilder for creating form groups
    private userService: TableService, // Service for user-related operations
    private messageService: MessageService, // Service for displaying messages
    private confirmationService: ConfirmationService // Service for displaying confirmation dialogs
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialize the form on component initialization
    this.loadUsers(); // Load user data on component initialization
  }

  // Method to initialize the form group
  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Name field with validators
      email: ['', [Validators.required, Validators.email]], // Email field with validators
      mobileNumber: ['', Validators.required], // Mobile number field with required validator
      address: ['', Validators.required], // Address field with required validator
    });
  }

  // Getters for form controls to access them easily in the template
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get mobileNumber() {
    return this.form.get('mobileNumber');
  }

  get address() {
    return this.form.get('address');
  }

  // Method to show the PDF display dialog for a specific user
  showpdfdisplayDialog(user: any) {
    this.pdfdisplay = true;
    this.generatePDF(user); // Generate PDF for the selected user
  }

  // Asynchronously show the PDF display dialog for all users
  async showallpdfdisplayDialog(): Promise<void> {
    this.pdfdisplay = true;
    try {
      this.loading = true;
      const response = await this.userService.generatePdfalluser(); // Call service method to generate PDF for all users
      this.pdfdetails = {
        pdfBase64: { data: response, user: 'All User List' }, // Set PDF details
      };
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successfully generated PDF',
      });
      this.loading = false;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to generate PDF',
      });
      this.loading = false;
      console.error('Failed to generate PDF:', error); // Log error to console
    }
  }

  // Method to download the generated PDF
  downloadPDF(): void {
    const linkSource = this.pdfdetails.pdfBase64.data;
    const downloadLink = document.createElement('a');
    const fileName = `${this.pdfdetails.pdfBase64.user}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  // Method to confirm deletion of a user
  confirmDelete(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?', // Confirmation message
      accept: () => {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Item deleted successfully',
              life: 1000,
            });
            this.loading = true;
            this.loadUsers(); // Reload user data
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete item',
              life: 1000,
            });
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  // Method to generate PDF for a specific user
  generatePDF(user: any): void {
    this.loading = true;
    this.userService.generatePdf(user).subscribe(
      (response) => {
        this.pdfdetails = response; // Set PDF details
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Successfully generated PDF',
        });
        this.loading = false;
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to generate PDF',
        });
        this.loading = false;
      }
    );
  }

  // Method to handle user update
  onUpdate(): void {
    if (this.form.valid && this.userIdToUpdate) {
      const data = { ...this.form.value, _id: this.userIdToUpdate }; // Prepare data for update
      this.userService.updateUser(data).subscribe(
        () => {
          this.resetForm(); // Reset form
          this.displayDialog = false; // Close dialog
          this.loadUsers(); // Reload user data
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User updated successfully',
          });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update user',
          });
        }
      );
    } else {
      this.validateAllFormFields(this.form); // Validate form fields if form is invalid
    }
  }

  // Recursive method to validate all form fields
  private validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control); // If control is a form group, recursively validate its fields
      } else {
        control?.markAsTouched({ onlySelf: true }); // Mark individual control as touched
      }
    });
  }

  // Method to reset the form
  private resetForm(): void {
    this.form.reset(); // Reset form controls
    this.updating = false; // Reset updating flag
    this.userIdToUpdate = null; // Reset user ID to update
  }

  // Method to load users
  private loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response; // Set user data
        this.originalUsers = [...this.users]; // Store the original list of users
        this.loading = false; // Disable loading indicator
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load users',
        });
      },
    });
  }

  // Method to filter users based on search term
  tableSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase(); // Get the search term entered by the user
    if (searchTerm) {
      this.users = this.originalUsers.filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm)
      );
    } else {
      this.users = [...this.originalUsers]; // Restore the original list when search term is cleared
    }
  }

  // Method to open the edit dialog for a specific user
  openDialog(user: any): void {
    this.displayDialog = true; // Set displayDialog flag to true to show the dialog
    this.userIdToUpdate = user._id; // Set the user ID to update
    this.form.patchValue(user); // Patch the form with the user's data for editing
    this.updating = true; // Set updating flag to true to indicate editing mode
  }
}
