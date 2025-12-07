import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbitService } from './shared/services/Flowbit/flowbit-service';
import { Navbar } from "./core/layout/navbar/navbar";
import { Footer } from "./core/layout/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  protected readonly title = signal('FreshCart');

  private flowbiteInit = inject(FlowbitService);

  ngOnInit() {
    this.flowbiteInit.initFlowbite();
  }
}
