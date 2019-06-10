import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  private isMenuOpen: Boolean = false;
  public contentMargin: Number;
  public mode: String;
  public sideNavWidth: Number;
  public isNavOpen: Boolean = false;
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe("(min-width : 599px)").subscribe(result => {
      if (result.matches) {
        this.mode = "side";
        this.sideNavWidth = this.contentMargin = 240;
        this.isMenuOpen = this.isNavOpen = true;
      } else {
        this.mode = "over";
        this.contentMargin = 0;
        this.isMenuOpen = this.isNavOpen = false;
      }
    });
  }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.mode === "side") {
      this.isMenuOpen
        ? (this.sideNavWidth = this.contentMargin = 240)
        : (this.sideNavWidth = this.contentMargin = 70);
    } else {
      this.sideNavWidth = this.isMenuOpen ? 240 : 0;
      this.isNavOpen = this.isMenuOpen;
    }
  }
}
