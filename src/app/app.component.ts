import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  open = false;
  letters: string[];
  brand: string;
  show = false;

  toggleDrawer() {
    this.open = !this.open;
  }

  constructor(
    private service: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.navigate([""]);
    this.setLetters();
  }

  setLetters() {
    this.service.getLetters().subscribe(
      (data) => {
        this.letters = Object.keys(data["letters"]) as string[];
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  getBrand(name: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate(["/brands", name]));
    this.show = true;
    this.brand = name;
  }
}
