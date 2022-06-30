import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { HttpErrorResponse } from '@angular/common/http';

export enum KEY_CODE {
  RIGHT = 39,
  LEFT = 37
}

@Component({
  selector: 'app-car-preview',
  templateUrl: './car-preview.component.html',
  styleUrls: ['./car-preview.component.scss']
})
export class CarPreviewComponent implements OnInit {

  photo: string;
  cars: string[];
  index: number;
  numberPhotos: number;
  isSubModel: string;

  constructor(private route: ActivatedRoute, private router: Router, private service: AppService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == KEY_CODE.RIGHT) {
      this.selectPhoto('nex');
    } else if (event.keyCode == KEY_CODE.LEFT) {
      this.selectPhoto('bef');
    }
  }

  ngOnInit() {
    this.photo = this.route.snapshot.paramMap.get('name');
    this.isSubModel = this.route.snapshot.paramMap.get('submodel');
    this.setPhoto();
  }

  setPhoto() {
    const brand = this.service.getBrand();
    const model = this.service.getModel();

    this.service.getPhotos(brand).subscribe(data => {
      if (this.isSubModel) {
        const submodel = this.service.getSubModel();
        this.cars = data[brand]['models'][model]['sub-models'][submodel]['photos'] as string[];
      } else {
        this.cars = data[brand]['models'][model]['photos'] as string[];
      }

      this.numberPhotos = this.cars.length;

      for (let index = 0; index < this.cars.length; index++) {
        if (this.cars[index] == this.photo) {
          this.index = index;
        }
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  goToBack() {
    if (this.isSubModel) {
      const submodel = this.service.getSubModel();
      this.router.navigate(['/car/' + submodel, {submodel: true}]);
    } else {
      const model = this.service.getModel();
      this.router.navigate(['/car/' + model]);
    }
  }

  selectPhoto(val: string) {
    if (val == 'bef' && this.index > 0) {
      --this.index;
      this.photo = this.cars[this.index];
    } else if (val == 'nex' && this.index < this.numberPhotos - 1) {
      ++this.index;
      this.photo = this.cars[this.index];
    }
  }

}
