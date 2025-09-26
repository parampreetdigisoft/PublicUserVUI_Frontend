import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageKeyEnum } from '../../../core/enums/StorageKeyEnum';
import { UserService } from '../../../core/services/user-service';

@Component({
  selector: 'app-sidebar-component',
  imports: [],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css'
})
export class SidebarComponent {

 constructor(private userService: UserService, public router: Router) { }



   logout() {
    localStorage.removeItem(StorageKeyEnum.UserInfo);
    this.userService.userInfo = null;
    this.router.navigate(['/auth/login']);
  }
}
