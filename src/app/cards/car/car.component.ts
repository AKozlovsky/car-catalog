import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
  model: any;
  photos: string[];
  cars: string[];
  brand: string;
  year: string;
  name: string;
  isSubModel: string;

  constructor(private route: ActivatedRoute, private router: Router, private service: AppService) { }

  ngOnInit() {
    this.model = this.route.snapshot.paramMap.get('model');
    this.isSubModel = this.route.snapshot.paramMap.get('submodel');
    this.brand = this.service.getBrand();

    if (this.isSubModel == null) {
      this.service.saveModel(this.model);
    } else {
      this.service.saveSubModel(this.model);
    }

    this.setPhoto();
  }

  setPhoto() {
    this.service.getPhotos(this.brand).subscribe(data => {
      this.name = this.model;

      if (this.isSubModel) {
        const subModel = this.model;
        const model = this.service.getModel();
        this.year = data[this.brand]['models'][model]['sub-models'][subModel]['year'];
        this.cars = data[this.brand]['models'][model]['sub-models'][subModel]['photos'] as string[];
      } else {
        this.year = data[this.brand]['models'][this.model]['year'];
        this.cars = data[this.brand]['models'][this.model]['photos'] as string[];
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  goToBack() {
    if (this.isSubModel) {
      const model = this.service.getModel();
      this.router.navigate(['/sub-models/' + model]);
    } else {
      this.router.navigate(['/models/' + this.brand]);
    }
  }

}
