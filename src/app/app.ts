
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HearderComponent } from './shared/components/hearder-component/hearder-component';
import { FooterComponent } from './shared/components/footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HearderComponent,FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {

  protected readonly title = signal('PublicVUI_Frontend');

}
