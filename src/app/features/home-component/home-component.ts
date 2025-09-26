import { SidebarComponent } from '../../shared/components/sidebar-component/sidebar-component';
import { TieredAccessPlanValue } from '../../core/enums/TieredAccessPlan';
import { UserService } from '../../core/services/user-service';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit{

  tier = signal<TieredAccessPlanValue>(TieredAccessPlanValue.Pending);
  pending=TieredAccessPlanValue.Pending;

  constructor(private userService:UserService){

  }
  ngOnInit(): void {
    
  }
}
