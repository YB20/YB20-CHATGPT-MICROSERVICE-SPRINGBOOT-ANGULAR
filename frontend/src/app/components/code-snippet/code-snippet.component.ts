// code-snippet.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.css'],
})
export class CodeSnippetComponent {
  @Input() codeSnippet: string = '';
  @Input() fileName: string = 'code'; // Default file name

  downloadCode(): void {
    const blob = new Blob([this.codeSnippet], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = this.fileName + '.java';
    link.click();
  }
}
