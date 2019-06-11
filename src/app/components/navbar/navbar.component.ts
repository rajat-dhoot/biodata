import { Component, OnInit } from "@angular/core";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

const SMALL_WIDTH_BREAKPOINT = 600;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  public isMenuOpen: Boolean;
  public contentMargin: Number;
  public sideNavWidth: Number;
  isScreenSmall: Observable<boolean>;

  public listItems = {
    key1: { name: "Home", icon: "home" },
    key2: { name: "Create", icon: "create" },
    key3: { name: "Settings", icon: "settings" },
    key4: { name: "Feedback", icon: "feedback" }
  };

  constructor(breakpointObserver: BreakpointObserver) {
    this.isMenuOpen = false;
    this.isScreenSmall = breakpointObserver
      .observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
  }

  ngOnInit(): void {
    this.isScreenSmall.subscribe(result => {
      result
        ? (this.contentMargin = 0) //mobile view
        : (this.sideNavWidth = this.contentMargin = 70); //desktop view
    });
  }

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.contentMargin > 0) {
      this.isMenuOpen
        ? (this.sideNavWidth = this.contentMargin = 240)
        : (this.sideNavWidth = this.contentMargin = 70);
    } else this.sideNavWidth = this.isMenuOpen ? 240 : 0;
  }
}
