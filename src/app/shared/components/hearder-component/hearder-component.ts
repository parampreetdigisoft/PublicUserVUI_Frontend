import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-hearder-component',
  imports: [RouterLink,CommonModule],
  templateUrl: './hearder-component.html',
  styleUrl: './hearder-component.css'
})
export class HearderComponent  implements OnInit, AfterViewInit, OnDestroy {
  pillars = [
    "Environmental",
    "*",
    "Economic",
    "*",
    "Social",
    "*",
    "Education",
    "*",
    "Business"
  ];

  // BehaviorSubject (in case you want to add/remove dynamically later)
  private pillarSubject = new BehaviorSubject<string[]>(this.pillars);
  pillars$ = this.pillarSubject.asObservable();

  @ViewChild('scrollTrack', { static: false }) trackRef!: ElementRef<HTMLDivElement>;

  private animationFrameId: number = 0;
  private position: number = 0;
  private speed: number = 0.5; // pixels per frame, adjust speed

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.animate();
  }

  private animate = () => {
    if (this.trackRef) {
      this.position -= this.speed;

      const track = this.trackRef.nativeElement;
      const resetPoint = track.scrollWidth / 2;

      if (-this.position >= resetPoint) {
        this.position = 0; // reset without jump
      }

      track.style.transform = `translateX(${this.position}px)`;
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}