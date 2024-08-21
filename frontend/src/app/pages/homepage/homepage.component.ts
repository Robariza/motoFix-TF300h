import { Component, OnInit } from '@angular/core';
import { BannerComponent } from "../../components/banner/banner.component";
import { GridMarcasComponent } from "../../components/grid-marcas/grid-marcas.component";
import { GridOfertasComponent } from "../../components/grid-ofertas/grid-ofertas.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [BannerComponent, GridMarcasComponent, GridOfertasComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
