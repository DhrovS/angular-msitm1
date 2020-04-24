import { Component } from '@angular/core';
import { ConnectingToDatabaseService } from './services/connecting-to-database.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
}
