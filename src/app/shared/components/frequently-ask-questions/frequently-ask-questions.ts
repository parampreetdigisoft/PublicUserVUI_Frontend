import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-frequently-ask-questions',
  imports: [CommonModule  ],
  templateUrl: './frequently-ask-questions.html',
  styleUrl: './frequently-ask-questions.css'
})
export class FrequentlyAskQuestions {
  showMore = signal(false);

}
