import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sub-models',
  templateUrl: './sub-models.component.html',
  styleUrls: ['./sub-models.component.scss']
})
export class SubModelsComponent implements OnInit {

  brand: any;
  model: any;
  photos: string[];
  models: string[];

  constructor(private route: ActivatedRoute, private router: Router, private service: AppService) { }

  ngOnInit() {
    this.brand = this.service.getBrand();
    this.model = this.route.snapshot.paramMap.get('model');
    this.service.saveModel(this.model);
    this.setPhoto();
  }

  setPhoto() {
    this.service.getPhotos(this.brand).subscribe(data => {
      this.photos = data[this.brand]['models'][this.model]['sub-models'] as string[];
      delete this.photos['photo'];
      this.models = Object.keys(this.photos);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  goToBack() {
    this.router.navigate(['/models/' + this.brand]);
  }
}
