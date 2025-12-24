import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../../../shared/services/Category/category-service';
import { category } from '../../../../../shared/interfaces/category';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.html',
  styleUrl: './popular-categories.scss',
})
export class PopularCategories implements OnInit {
  _categoryService = inject(CategoryService);
  Categories!: category[];

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
    margin: 5,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this._categoryService.getCategories().subscribe({
      next: (res) => {
        console.log(res.data, 'categories Data ');
        this.Categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
