import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DetailsBioComponent } from "./details-bio/details-bio.component";
import { BioRoutingModule } from "./bio-routing.module";
import { CanDeactivateGuard } from "./services/can-deactivate-guard.service";
import { BioService } from "./services/bio.service";
import { CreateBioComponent } from "./create-bio/create-bio.component";
import { DialogService } from "./services/dialog.service";
import { MAT_DATE_LOCALE } from "@angular/material";
import { DownloadBioComponent } from "./download-bio/download-bio.component";
import { PrepareBioComponent } from "./prepare-bio/prepare-bio.component";
import { DetailsResolverService } from "./services/details-resolver.service";

@NgModule({
  declarations: [
    CreateBioComponent,
    DetailsBioComponent,
    DownloadBioComponent,
    PrepareBioComponent
  ],
  imports: [SharedModule, BioRoutingModule],
  providers: [
    BioService,
    DetailsResolverService,
    CanDeactivateGuard,
    DialogService,
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" }
  ]
})
export class BioModule {}
