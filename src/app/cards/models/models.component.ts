import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {

  brand: any;
  photos: string[];
  models: string[];

  constructor(private route: ActivatedRoute, private router: Router, private service: AppService) { }

  ngOnInit() {
    this.brand = this.route.snapshot.paramMap.get('brand');
    this.setPhoto();
  }

  setPhoto() {
    this.service.getPhotos(this.brand).subscribe(data => {
      this.photos = data[this.brand]['models'] as string[];
      this.models = Object.keys(this.photos);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  goToBack() {
    this.router.navigate(['/brand-preview/' + this.brand]);
  }

}
