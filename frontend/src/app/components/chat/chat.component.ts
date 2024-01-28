// chat.component.ts
import { Component } from '@angular/core';
import { JwtClientService } from '../../services/jwt-client.service';

interface ChatMessage {
  type: string;
  content: string;
  codeSnippets?: string[];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  chatMessages: ChatMessage[] = [];
  loading: boolean = false;
  userType: string = 'user';
  userRequest: string = '';
  additionalContextOrGoal: string = '';

  constructor(private jwtService: JwtClientService) {}

  processMessage(message: string): ChatMessage {
    const codeSnippetRegex = /```java([\s\S]*?)```/g;
    let content = message;
    const codeSnippets: string[] = [];

    // Extract code snippets
    message.replace(codeSnippetRegex, (match, code) => {
      codeSnippets.push(code.trim());
      return match;  // Keep the match unchanged to preserve formatting
    });

    codeSnippets.forEach((code, index) => {
      const placeholder = `__CODE_SNIPPET_${index}__`;
      content = content.replace(code, placeholder);
    });

    return { type: 'Server', content, codeSnippets };
  }

  sendPrompt(): void {
    if (this.userRequest.trim() !== '') {
      this.loading = true;
      const token = localStorage.getItem('token');

      // Construct the prompt string
      const promptString = `
        In the user story of ${this.userType},
        As a ${this.userType},
        I want to ${this.userRequest},
        So that ${this.additionalContextOrGoal}.
        Please provide the corresponding Java Spring Boot code.
      `;

      this.jwtService.sendPromptWithToken(promptString, token).subscribe(
        (response) => {
          const processedMessage = this.processMessage(response);
          this.chatMessages.unshift({ type: 'You', content: promptString });
          this.chatMessages.unshift(processedMessage);
          this.userRequest = '';
          this.loading = false;
        },
        (error) => {
          console.error('Error sending prompt:', error);
          this.loading = false;
        }
      );
    }
  }
}
