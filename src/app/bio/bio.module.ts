import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DesignBioComponent } from "./design-bio/design-bio.component";
import { DetailsBioComponent } from "./details-bio/details-bio.component";
import { CreateBioComponent } from "./create-bio/create-bio.component";
import { BioRoutingModule } from "./bio-routing.module";
import { CanDeactivateGuard } from "./services/can-deactivate-guard.service";
import { BioService } from "./services/bio.service";
import { DialogService } from "./services/dialog.service";
import { MAT_DATE_LOCALE } from "@angular/material";
import { DownloadBioComponent } from "./download-bio/download-bio.component";
import { PrepareBioComponent } from './prepare-bio/prepare-bio.component';

@NgModule({
  declarations: [
    DesignBioComponent,
    DetailsBioComponent,
    CreateBioComponent,
    DownloadBioComponent,
    PrepareBioComponent
  ],
  imports: [SharedModule, BioRoutingModule],
  providers: [
    BioService,
    CanDeactivateGuard,
    DialogService,
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" }
  ]
})
export class BioModule {}
