
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HearderComponent } from './shared/components/hearder-component/hearder-component';
import { FooterComponent } from './shared/components/footer-component/footer-component';
import { ToasterService } from './core/services/toaster.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HearderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('PublicVUI_Frontend');
  toastMessage = '';
  toastClass = '';
  private destroy$ = new Subject<void>();
  constructor(private toasterService: ToasterService) { }
  ngOnInit(): void {
    this.toasterService.success$
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.showToaster(message, 'success'));

    this.toasterService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.showToaster(message, 'danger'));

    this.toasterService.info$
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.showToaster(message, 'info'));

    this.toasterService.warning$
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.showToaster(message, 'warning'));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private showToaster(message: string, type: string) {
    this.toastMessage = message;
    this.toastClass = type;

    const toastEl = document.getElementById('liveToastBtn');
    if (!toastEl) return;

    // Remove all old type classes first
    toastEl.classList.remove('success', 'danger', 'info', 'warning');
    toastEl.classList.add(type);

    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2000 });
    toast.show();
  }

  isRouteLoading = true;

  onRouteActivate() {
    this.isRouteLoading = false;
  }

  onRouteDeactivate() {
    this.isRouteLoading = true;
  }
}
