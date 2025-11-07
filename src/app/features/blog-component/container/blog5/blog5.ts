import { Component, inject } from '@angular/core';
import { CommonService } from '../../../../core/services/common-service';

@Component({
  selector: 'app-blog5',
  imports: [],
  templateUrl: './blog5.html',
  styleUrl: './blog5.css'
})
export class Blog5 {
  loginCityUser() {
    this.common.goToSubscriptionApp();
  }
}
