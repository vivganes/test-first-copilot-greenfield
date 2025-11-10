import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  HelloWorldComponent } from './components/hello-world.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HelloWorldComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-portal';
}
