import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-brand-preview',
  templateUrl: './brand-preview.component.html',
  styleUrls: ['./brand-preview.component.scss']
})
export class BrandPreviewComponent implements OnInit {

  brand: string;
  brandName: string;
  timeline: string;
  founder: string;
  founderPhoto: string;
  flag: string;
  headquarters: string;
  headquartersPhoto: string;
  selectedPhoto: string;
  manyPhotos = false;
  disableBtnBefore = true;
  disableBtnNext = false;
  indexPhoto = 0;
  titlePhoto: string;

  constructor(private route: ActivatedRoute, private router: Router, private service: AppService) { }

  ngOnInit() {
    this.brand = this.route.snapshot.paramMap.get('brand');
    this.service.saveBrand(this.brand);
    this.setBrandInfo();
  }

  setBrandInfo() {
    this.service.getBrandInfo(this.brand).subscribe(data => {
      const brandInfo = data[this.brand]['description'] as string[];
      this.brandName = brandInfo['brand'];
      this.timeline = brandInfo['timeline'];
      this.founder = brandInfo['founder'];
      this.founderPhoto = brandInfo['founderPhoto'];
      this.flag = brandInfo['origin'];
      this.headquartersPhoto = brandInfo['headquartersPhoto'];
      this.selectedPhoto = this.headquartersPhoto[0];
      this.titlePhoto = brandInfo['cover'];

      if (this.headquartersPhoto.length > 1) {
        this.manyPhotos = true;
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  selectHeadquarters(movement: string) {
    if (movement == 'next') {
      this.disableBtnBefore = false;
      if (this.selectedPhoto == this.headquartersPhoto[this.headquartersPhoto.length - 1]) {
        this.disableBtnNext = true;
      } else {
        this.selectedPhoto = this.headquartersPhoto[++this.indexPhoto];
      }
    } else {
      this.disableBtnNext = false;
      if (this.selectedPhoto == this.headquartersPhoto[0]) {
        this.disableBtnBefore = true;
      } else {
        this.selectedPhoto = this.headquartersPhoto[--this.indexPhoto];
      }
    }
  }

  goToBack() {
    if (!isNaN(parseInt(this.brand[0], 10))) {
      this.router.navigate(['/brands/1-9']);
    } else {
      this.router.navigate(['/brands/' + this.brand[0]]);
    }
  }
}