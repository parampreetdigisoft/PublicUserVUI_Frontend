import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar-component/sidebar-component';
import { HearderComponent } from './shared/components/hearder-component/hearder-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidebarComponent,HearderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PublicVUI_Frontend');
}
