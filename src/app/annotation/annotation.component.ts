import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-annotation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {
  documentText: string = '';
  annotations: any[] = [];
  labels: string[] = ['SKILLS', 'EXPERIENCE', 'DIPLOMA', 'DIPLOMA_MAJOR'];
  selectedLabel: string = '';
  documentId: number = 1; // ID du document à exporter

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.loadDocument();
  }

  loadDocument(): void {
    this.documentService.getDocuments().subscribe(data => {
      this.documentText = data.document;
      this.annotations = data.annotations || [];
    });
  }

  annotateText(start: number, end: number, text: string): void {
    if (this.selectedLabel) {
      this.annotations.push({
        start: start,
        end: end,
        label: this.selectedLabel,
        text: text
      });
    }
  }

  saveAnnotations(): void {
    this.documentService.annotateDocument({ document: this.documentText, annotations: this.annotations })
      .subscribe(response => {
        console.log('Annotations saved:', response);
      });
  }

  exportAnnotations(): void {
    this.documentService.exportAnnotations(this.documentId).subscribe(data => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'annotations.json';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
