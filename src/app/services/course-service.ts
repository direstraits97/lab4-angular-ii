/**
 * Service som hanterar get-anrop för önskad data med HttpClient.
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Course } from '../interfaces/course';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);
  url: string = 'https://webbutveckling.miun.se/files/ramschema.json';

  getCourses(): Signal<Course[]> {
    const courses$ = this.http.get<Course[]>(this.url);
    return toSignal(courses$, { initialValue: [] });
  }
}
