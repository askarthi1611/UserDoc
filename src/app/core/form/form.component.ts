import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormService } from './form.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup | any;

  constructor(private fb: FormBuilder, public userform: FormService, private messageService: MessageService) {}

  ngOnInit(): void {
    // Initialize the form with form controls and validation rules
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
    
    // Log the result of fetching all users when the component initializes
    console.log(this.userform.getAllUsers(), "output");
  }

  // Getter functions for form control access
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

  // Handle form submission
  onSubmit() {
    if (this.form.valid) {
      const data = this.form.value; // Extract form data
      this.userform.createUser(data).subscribe(
        // Handle successful user creation
        (response) => {
          console.log(response, "output");
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully' });
          this.form.reset(); // Reset the form after successful submission
        },
        // Handle error during user creation
        (error) => {
          console.error('Error creating user:', error);
          let errorMessage = error.error?.error || 'An error occurred while creating user';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
        }
      );
    } else {
      this.validateAllFormFields(this.form); // Validate form fields if the form is not valid
    }
  }
  
  // Recursive function to validate all form fields
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
}
