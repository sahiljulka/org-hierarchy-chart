import { Component } from '@angular/core';
import { AppinitService } from './core/services/appinit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private appInitService: AppinitService) {}

  ngOnInit(): void {
    this.appInitService.initializeApp();
  }
}
