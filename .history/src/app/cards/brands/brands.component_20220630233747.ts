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
    this.brandLetter = this.route.snapshot.paramMap.get('brand');
    this.showLogos();
  }

  showLogos() {
    this.service.getLogos().subscribe(data => {
      this.logos = data as unknown as string[];
      console.log(this.logos);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
}
