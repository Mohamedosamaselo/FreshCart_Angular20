import { Component, inject, OnInit } from '@angular/core';
import { RecentProducts } from "./components/recent-products/recent-products";
import { PopularCategories } from "./components/popular-categories/popular-categories";
import { MainSlider } from "./components/main-slider/main-slider";
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [RecentProducts, PopularCategories, MainSlider, NgxSpinnerComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  private spinner = inject(NgxSpinnerService);

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }




}
