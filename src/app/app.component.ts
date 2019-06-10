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
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .subscribe(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.mode = "over";
          this.contentMargin = 0;
          this.isMenuOpen = this.isNavOpen = false;
        } else {
          this.mode = "side";
          this.isMenuOpen = this.isNavOpen = true;
          if (
            result.breakpoints[Breakpoints.Small] ||
            result.breakpoints[Breakpoints.Medium]
          )
            this.sideNavWidth = this.contentMargin = 6;
          else this.sideNavWidth = this.contentMargin = 18;
        }
      });
  }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.mode === "side") {
      this.isMenuOpen
        ? (this.sideNavWidth = this.contentMargin = 18)
        : (this.sideNavWidth = this.contentMargin = 6);
    } else {
      this.sideNavWidth = this.isMenuOpen ? 70 : 0;
      this.isNavOpen = this.isMenuOpen;
    }
  }
}
