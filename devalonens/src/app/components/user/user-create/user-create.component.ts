import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../../../services/staff.service';


@Component({
  selector: 'app-user-create',
  standalone: false,
  
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  dataForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: StaffService) {
    this.dataForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      //phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      this.apiService.saveStaff(this.dataForm.value).subscribe({
        next: (response) => alert('Data saved successfully!'),
        error: (error) => alert('Error saving data: ' + error.message)
      });
    } else {
      alert('Form is invalid');
    }
  }
}
