import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = +id;
      
      this.employeeService.getEmployee(this.employeeId).subscribe(data => {
        this.employeeForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.employeeId) {
        this.employeeService.updateEmployee({ id: this.employeeId, ...this.employeeForm.value }).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      } else {
        this.employeeService.addEmployee(this.employeeForm.value).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }
    }
  }
}