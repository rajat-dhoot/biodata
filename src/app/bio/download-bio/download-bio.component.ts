import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  ElementRef
} from "@angular/core";
import { BioService } from "../services/bio.service";
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
  hideLoader: boolean;
  timeleft: number = 5;
  timer: any;
  data;
  requiredHtml;

  constructor(
    private _bioservice: BioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.hideLoader = false;
    this.data = this._bioservice.getDetailsModel();
    if (!this.data)
      this.router.navigate(["../details"], { relativeTo: this.route });
  }

  ngAfterViewInit() {
    this.timer = setInterval(() => {
      if (!this.timeleft) {
        clearInterval(this.timer);
        this.requiredHtml = this.pdfHTML.element.nativeElement.innerHTML;
        this.downloadPdf();
      } else this.timeleft--;
    }, 1000);
  }

  downloadPdf() {
    var opt = {
      margin: [0.5, 0.5],
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    html2pdf()
      .set(opt)
      .from(this.requiredHtml)
      .save();
    setTimeout(() => {
      this.hideLoader = true;
    }, 2000);
    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
