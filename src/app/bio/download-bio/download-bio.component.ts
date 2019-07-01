import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ElementRef
} from "@angular/core";
import { BioService } from "../services/bio.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-download-bio",
  templateUrl: "./download-bio.component.html",
  styleUrls: ["./download-bio.component.scss"]
})
export class DownloadBioComponent implements OnInit, AfterViewInit {
  @ViewChild("htmlToConvert", { read: ViewContainerRef, static: false })
  pdfHTML;
  timeleft: number = 2;
  timer: any;
  data;
  requiredHtml;

  constructor(
    private _bioservice: BioService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // this.data = { ...this._bioservice.getDetailsModel().value };
  }

  openSnackBar(message: string, action: string) {
    this._snackBar
      .open(message, action, {
        duration: 2000
      })
      .onAction()
      .subscribe(() => console.log("Download the file"));
  }

  ngAfterViewInit() {
    this.timer = setInterval(() => {
      if (!this.timeleft) {
        clearInterval(this.timer);
        this.openSnackBar("Biodata is ready", "Download");
        this.requiredHtml = this.pdfHTML.element.nativeElement.innerHTML;
      } else this.timeleft--;
    }, 1000);
  }
}
