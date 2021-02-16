import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'
  ]
})
export class HeaderComponent {

  public user: User

  constructor(private userService: UserService) {

    this.user = userService.user
  }

  logout() {
    this.userService.logout()
  }
}
