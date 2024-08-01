import { Routes } from '@angular/router';
import { AnnotationComponent } from './annotation/annotation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/annotation', pathMatch: 'full' },
  { path: 'annotation', component: AnnotationComponent }
];
