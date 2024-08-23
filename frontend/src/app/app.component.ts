import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormAdminComponent } from './components/form-admin/form-admin.component';
// importación componentes estáticos
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormAdminComponent, MenuNavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
