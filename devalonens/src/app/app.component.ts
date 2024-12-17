import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  
  title = 'devalonens';

  events: string[] = [];
  opened: boolean = true;
}
