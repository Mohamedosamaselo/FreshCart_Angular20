import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './main-slider.html',
  styleUrl: './main-slider.scss',
})
export class MainSlider {
  //owlCarsoul configurations
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: [
      '<i class="fa-solid fa-chevron-left text-xl"></i>',
      '<i class="fa-solid fa-chevron-right text-xl"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
}
