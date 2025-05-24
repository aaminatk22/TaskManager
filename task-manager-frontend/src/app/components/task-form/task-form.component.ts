import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  // Initialize taskForm in the constructor instead of as a class field
  taskForm: ReturnType<typeof this.createForm>;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.createForm();
  }

  private createForm() {
    return this.fb.group({
      title: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value.title!).subscribe({
        next: () => {
          this.taskForm.reset();
        },
        error: (err) => console.error('Error adding task', err)
      });
    }
  }
}