import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IStudent } from './shared/interfaces/student';
import { StudentService } from './shared/services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'selaski-proof';
  students: IStudent[] = [];
  studentForm!: FormGroup;

  isPageLoaded: boolean = false;
  studenSelect: any;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    this.loadStudent()
  }

  // ngAfterViewInit(): void {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   this.isPageLoaded = true;
  // }

  createForm() {
    // this.studentForm = this.fb.group([
    //   {
    //     name: [null, Validators.required],
    //     email: [null, Validators.required],
    //     lastName: [null, Validators.required]
    //   }
    // ]);
    this.studentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      lastName:  new FormControl('', [Validators.required]),
    });
  }

  addStudent() {
    if(this.studentForm.valid) {
      const formValues = this.studentForm.getRawValue();
      this.studentService.addStudent(formValues);
    }
  }

  private loadStudent() {
    this.students = this.studentService.getAllStudent();
    console.log(this.students);
    this.isPageLoaded = true;
  }

  editForm(index: number) {
    this.studenSelect = { ...this.students[index] };
    this.studentForm.patchValue(this.studenSelect);
  }

  editStudent() {
    const formValues = this.studentForm.getRawValue();
    this.studentService.editStudentById(this.studenSelect.id, formValues);
    this.studentForm.reset({
      name: '',
      email: '',
      lastName: ''
    });
    this.studenSelect = null;
  }

  deleteStudent(index:number) {
    const student = { ...this.students[index] };
    this.studentService.deleteStudentById(student.id)
  }
}
