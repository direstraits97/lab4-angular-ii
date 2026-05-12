/**
 * Denna fil filtrerar och sorterar datat som hämtas.
 * Av: Josefine Backlund
 */

import { Component, inject, effect, signal } from '@angular/core';
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
  private courseService = inject(CourseService);
  courses = this.courseService.getCourses();
  courseSearch: string = ''; //Sökrutan i html-filen.
  manipulatedCourses = signal<Course[]>([]); //Här ska filtrerad data hamna.

  constructor() {
    effect(() => {
      this.manipulatedCourses.set(this.courses()); //När datat har kommit in med get-anropet fylls manipulatedCourses-arrayen med det data som hämtats. Varje förändring i signalerna avlyssnas.
    });
  }
  //Detta är en grundläggande formel för sortering där innehållet jämförs för att uppnå önskad struktur. För mindre redundans används denna funktion flera gånger med olika parametrar.
  private sortBy(sortKey: 'code' | 'coursename' | 'progression'): void {
    this.manipulatedCourses().sort((a, b) => {
      let x = a[sortKey].toLowerCase();
      let y = b[sortKey].toLowerCase();
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
  //Nedan funktioner sorterar datat baserat på kurskod, kursnamn och progression. De triggas av klick i html-filen.
  sortByCode(): void {
    this.sortBy('code');
  }
  sortByName(): void {
    this.sortBy('coursename');
  }

  sortByProgression(): void {
    this.sortBy('progression');
  }
  //Nedan funktion filtrerar ut datat som matchar det som finns i sökrutan i html-filen. Arrayen manipulatedCourses uppdateras med matchande data.
  filterBySearch(): void {
    const filteredCourses = this.courses().filter(
      (course) =>
        course.coursename.toLowerCase().includes(this.courseSearch) ||
        course.code.toLowerCase().includes(this.courseSearch),
    );
    this.manipulatedCourses.set(filteredCourses);
  }
}
