import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  courseService = inject(CourseService);
  courses = this.courseService.getCourses();

  sortByCode() {
    this.courses().sort((a, b) => {
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

  sortByName() {
    this.courses().sort((a, b) => {
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

  sortByProgression() {
    this.courses().sort((a, b) => {
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
}
