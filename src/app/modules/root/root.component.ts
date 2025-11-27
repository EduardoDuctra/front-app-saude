import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root-layout',
  standalone: true,
  templateUrl: './root.component.html',
  styleUrl: './root.component.css',
  imports: [RouterOutlet],
})
export class RootComponent {}
