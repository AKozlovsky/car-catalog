import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  logos: string[];
  brandLetter: string;

  constructor(private service: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap);
    if (this.route.snapshot.queryParams['brand']) {
      this.brandLetter = this.route.snapshot.paramMap.get('brand');
      this.showLogos();
    }
  }

  showLogos() {
    this.service.getLogos(this.brandLetter).subscribe(data => {
      this.logos = data as unknown as string[];
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
