import { Component, computed, Input, input } from '@angular/core';

import { type User } from './user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [
    RouterLink, RouterLinkActive
  ]
})
export class UserComponent {
  @Input() user!: User;
}
