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
    key3: { name: "Feedback", icon: "feedback" },
    key4: { name: "Help", icon: "help" },
    key5: { name: "Contact Us", icon: "contacts" },
    key6: { name: "Contribute", icon: "\u20B9" }
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

  onToolbarMenuToggle(value = "default") {
    if (value === "close" && !this.isMenuOpen) return;
    this.isMenuOpen = !this.isMenuOpen;
    if (this.contentMargin > 0) {
      this.isMenuOpen
        ? (this.sideNavWidth = this.contentMargin = 240)
        : (this.sideNavWidth = this.contentMargin = 70);
    } else this.sideNavWidth = this.isMenuOpen ? 240 : 0;
  }
}
