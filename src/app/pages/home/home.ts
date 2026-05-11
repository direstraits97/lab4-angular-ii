import { Component, inject, effect } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { FormsModule } from '@angular/forms';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  courseService = inject(CourseService);
  courses = this.courseService.getCourses();
  courseSearch: string = '';
  filteredCourses: Course[] = [];

  constructor() {
    effect(() => {
      this.filteredCourses = this.courses();
    });
  }
  sortByCode(): void {
    this.filteredCourses.sort((a, b) => {
      let x = a.code.toLowerCase();
      let y = b.code.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  sortByName(): void {
    this.filteredCourses.sort((a, b) => {
      let x = a.coursename.toLowerCase();
      let y = b.coursename.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  sortByProgression(): void {
    this.filteredCourses.sort((a, b) => {
      let x = a.progression.toLowerCase();
      let y = b.progression.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  filterBySearch(): void {
    const filteredCourses = this.courses().filter(
      (course) =>
        course.coursename.toLowerCase().includes(this.courseSearch) ||
        course.code.toLowerCase().includes(this.courseSearch),
    );
    this.filteredCourses = filteredCourses;
  }
}
