import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbitService } from './shared/services/Flowbit/flowbit-service';
import { Navbar } from "./core/layout/navbar/navbar";
import { Footer } from "./core/layout/footer/footer";
import { NgxSpinnerService, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // DI
  private spinner = inject(NgxSpinnerService);
  private flowbiteInit = inject(FlowbitService);

  // signals
  protected readonly title = signal('FreshCart');

  ngOnInit() {
    this.flowbiteInit.initFlowbite();
  }

  show() {
    this.spinner.show();
  }

  hide() {
    this.spinner.hide();
  }


}
