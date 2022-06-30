import { Component, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  name: any;

  constructor(private service: AppService, private router: Router) { }

  @Input()
  get brand() {
    return this.name;
  }

  set brand(val) {
    if (val == undefined) {
      val = this.service.getValue();
    }

    this.name = val;
    this.service.saveValue(val);
    this.router.navigate(['/brands', this.name]);
  }
}
