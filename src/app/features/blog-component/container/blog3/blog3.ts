import { Component, inject } from '@angular/core';
import { CommonService } from '../../../../core/services/common-service';

@Component({
  selector: 'app-blog3',
  imports: [],
  templateUrl: './blog3.html',
  styleUrl: './blog3.css'
})
export class Blog3 {
private common = inject(CommonService);

  loginCityUser() {

    this.common.goToSubscriptionApp();
  }
}
