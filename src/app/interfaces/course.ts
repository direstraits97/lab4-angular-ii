/**
 * Interface för inkommande kurs-data.
 */

export interface Course {
  code: string;
  coursename: string;
  progression: string;
  syllabus?: string;
}
