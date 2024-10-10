import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PromotionBannerComponent } from "./components/promotion-banner/promotion-banner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavComponent, FooterComponent, PromotionBannerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }
}
