import { Component } from '@angular/core';
import { ValdemortConfig } from 'ngx-valdemort';
import { VERSION } from 'src/environments/version';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(config: ValdemortConfig) {
    console.log(
      `Application version is: version (from package.json)=${VERSION.version}, git-tag=${VERSION.tag}, git-hash=${VERSION.hash}`
    );

    config.errorsClasses = 'text-warning';
  }
}
