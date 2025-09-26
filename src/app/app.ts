import { HearderComponent } from './shared/components/hearder-component/hearder-component';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ToasterService } from './core/services/toaster-service';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HearderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  protected readonly title = signal('PublicVUI_Frontend');

  toastMessage = signal<string>('');
  toastClass = signal<string>('');
  showToast = signal<boolean>(false);
  toasterService = inject(ToasterService);
  private destroy$ = new Subject();

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
    this.toastMessage.set(message);
    this.toastClass.set(className);
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.destroy$.complete();
  }
}
