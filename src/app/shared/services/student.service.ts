import { Injectable } from '@angular/core';
import { IStudent } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
studentList:IStudent[] =  [
  {
    id: 1,
    name: 'julio',
    lastName: 'rossell',
    email: 'j@j.com'
  },
  {
    id: 2,
    name: 'miguel',
    lastName: 'tadeo',
    email: 'j@j.com'
  },
  {
    id: 3,
    name: 'grace',
    lastName: 'patiño',
    email: 'j@j.com'
  },
  {
    id: 4,
    name: 'francisco',
    lastName: 'cc',
    email: 'j@j.com'
  },

];
constructor() { }

addStudent(student: any) {
  this.studentList.push(student);
}

editStudentById(studentId: number, student: any) {
  const findIndex = this.studentList.findIndex(x => x.id == studentId);
  if (findIndex !== -1) {
    this.studentList[findIndex] = student;
  }
}

deleteStudentById(studentId: number) {
  const findIndex = this.studentList.findIndex(x => x.id == studentId);
  if (findIndex !== -1) {
    this.studentList.splice(findIndex, 1);
  }
}

getAllStudent() {
  return this.studentList;
}

}
