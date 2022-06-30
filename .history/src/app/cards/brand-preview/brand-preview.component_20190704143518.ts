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

  private brand: string;
  private brandName: string;
  private timeline: string;
  private founder: string;
  private founderPhoto: string;
  private flag: string;
  private headquarters: string;
  private headquartersPhoto: string;
  private selectedPhoto: string;
  private manyPhotos = false;
  private disableBtnBefore = true;
  private disableBtnNext = false;
  private indexPhoto = 0;
  private titlePhoto: string;

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