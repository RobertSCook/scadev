import { Component } from '@angular/core';

@Component({
  selector: 'sca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sca';
  errorMsg: string; // TODO: Need to bubble up errors to this level...maybe?
}
