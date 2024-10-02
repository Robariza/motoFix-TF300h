import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promotion-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotion-banner.component.html',
  styleUrl: './promotion-banner.component.css'
})
export class PromotionBannerComponent {
  backgroundColor = '#46b5aa';

  changeBackground(isHover: boolean): void {
    this.backgroundColor = isHover ? '#d82d41' : '#46b5aa';
  }
}
