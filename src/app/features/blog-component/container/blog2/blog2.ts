
import { Component, inject } from '@angular/core';
import { CommonService } from '../../../../core/services/common-service';

@Component({
  selector: 'app-blog2',
  imports: [],
  templateUrl: './blog2.html',
  styleUrl: './blog2.css'
})
export class Blog2 {
private common = inject(CommonService);

  loginCityUser() {

    this.common.goToSubscriptionApp();
  }
}
