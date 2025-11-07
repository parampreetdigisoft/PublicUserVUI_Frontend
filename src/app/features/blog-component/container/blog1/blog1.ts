import { Component, inject } from '@angular/core';
import { CommonService } from '../../../../core/services/common-service';

@Component({
  selector: 'app-blog1',
  imports: [],
  templateUrl: './blog1.html',
  styleUrl: './blog1.css'
})
export class Blog1 {
private common = inject(CommonService);

  loginCityUser() {

    this.common.goToSubscriptionApp();
  }
}
