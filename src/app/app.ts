
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HearderComponent } from './shared/components/hearder-component/hearder-component';
import { FooterComponent } from './shared/components/footer-component/footer-component';
import { ToasterService } from './core/services/toaster.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet, HearderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('PublicVUI_Frontend');
  toastMessage = '';
  toastClass = '';
  showToast = signal(false);
  private destroy$ = new Subject();
  constructor(private toasterService: ToasterService) { }
  ngOnDestroy(): void {
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.toasterService.success$.pipe(takeUntil(this.destroy$))
      .subscribe(message => this.showToaster(message, 'success'));
    this.toasterService.error$.pipe(takeUntil(this.destroy$))
      .subscribe(message => this.showToaster(message, 'danger'));
    this.toasterService.info$.pipe(takeUntil(this.destroy$))
      .subscribe(message => this.showToaster(message, 'info'));
    this.toasterService.warning$.pipe(takeUntil(this.destroy$))
      .subscribe(message => this.showToaster(message, 'warning'));

  }


  private showToaster(message: string, className: string) {
    this.showToast.set(true);
    this.toastMessage = message;
    this.toastClass = className;
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }
}
