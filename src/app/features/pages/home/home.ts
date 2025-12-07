import { Component } from '@angular/core';
import { RecentProducts } from "./components/recent-products/recent-products";
import { PopularCategories } from "./components/popular-categories/popular-categories";
import { MainSlider } from "./components/main-slider/main-slider";

@Component({
  selector: 'app-home',
  imports: [RecentProducts, PopularCategories, MainSlider],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
