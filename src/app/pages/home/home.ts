import { Component, inject } from '@angular/core';
import { CourseService } from '../../services/course-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  courseService = inject(CourseService);
  courses = this.courseService.getCourses();
}
