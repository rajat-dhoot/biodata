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
import { ActivatedRoute, Router } from "@angular/router";
import html2pdf from "html2pdf.js";

@Component({
  selector: "app-download-bio",
  templateUrl: "./download-bio.component.html",
  styleUrls: ["./download-bio.component.scss"]
})
export class DownloadBioComponent implements OnInit, AfterViewInit {
  @ViewChild("htmlToConvert", { read: ViewContainerRef, static: false })
  pdfHTML;
  timeleft: number = 5;
  timer: any;
  data;
  requiredHtml;

  constructor(
    private _bioservice: BioService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.data = this._bioservice.getDetailsModel();
    if (!this.data)
      this.router.navigate(["../details"], { relativeTo: this.route });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar
      .open(message, action, {
        duration: 2000
      })
      .onAction()
      .subscribe(() => this.downloadPdf());
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

  downloadPdf() {
    html2pdf()
      .set({ image: { type: "png", quality: 1 } })
      .from(this.requiredHtml)
      .save();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
