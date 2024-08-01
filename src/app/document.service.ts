import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://127.0.0.1:8000/api/documents/';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  annotateDocument(annotation: any): Observable<any> {
    return this.http.post(this.apiUrl, annotation);
  }

  exportAnnotations(documentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}export/${documentId}/`);
  }
}
