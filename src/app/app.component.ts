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

  public listItems = {
    key1: { name: "Home", icon: "home" },
    key2: { name: "Create", icon: "create" },
    key3: { name: "Settings", icon: "settings" },
    key4: { name: "Feedback", icon: "feedback" }
  };

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
        } else if (
          result.breakpoints[Breakpoints.Small] ||
          result.breakpoints[Breakpoints.Medium]
        ) {
          this.isMenuOpen = false;
          this.isNavOpen = true;
          this.mode = "side";
          this.sideNavWidth = this.contentMargin = 70;
        } else {
          this.mode = "side";
          this.isMenuOpen = this.isNavOpen = true;
          this.sideNavWidth = this.contentMargin = 240;
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
