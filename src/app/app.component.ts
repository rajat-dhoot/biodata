import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public isMenuOpen: Boolean;
  public contentMargin: Number;
  constructor(breakpointObserver: BreakpointObserver) {
    this.isMenuOpen = false;
    this.contentMargin = 70;
    breakpointObserver.observe("(min-width : 599px)").subscribe(result => {
      if (result.matches) {
        this.isMenuOpen = true;
        this.contentMargin = 240;
      } else {
        this.isMenuOpen = false;
        this.contentMargin = 70;
      }
    });
  }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.contentMargin = 240;
    } else this.contentMargin = 70;
  }
}
