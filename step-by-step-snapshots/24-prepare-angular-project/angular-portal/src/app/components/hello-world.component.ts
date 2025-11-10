import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'hello-world',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hello-world.component.html',
  styles: [`
    div { font-family: Arial, sans-serif; margin: 20px; } 
  `]
})
export class HelloWorldComponent {
  message: string = 'Hello, World!';

  constructor() {}

  
}
