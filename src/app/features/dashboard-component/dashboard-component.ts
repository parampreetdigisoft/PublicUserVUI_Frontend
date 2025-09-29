import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user-service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TieredAccessPlanValue } from '../../core/enums/TieredAccessPlan';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../core/services/common-service';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule,RouterOutlet],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private userService:UserService, private router:Router, private route: ActivatedRoute,private commonService:CommonService){}

  ngOnInit(): void {
    
    var userInfo = this.userService.userInfo

    let activeRoute = this.route.firstChild;
    let url = this.RenderActivatedRoute();
    if(userInfo?.tier != null && userInfo?.tier != TieredAccessPlanValue.Pending){
      this.userService.userInfo =null;
      this.commonService.goToSubscriptionApp();
    }
    else if(url =="payment-success" || url =="payment-cancel"){
    
    }else{
       this.router.navigate(['/payment']);
    }
  }

   private RenderActivatedRoute() {
    const deepest = this.getDeepestChild(this.route);
    return deepest?.snapshot?.data['roles'] ?? '';
  }
  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    let r = route;
    while (r.firstChild) {
      r = r.firstChild;
    }
    return r;
  }

}
