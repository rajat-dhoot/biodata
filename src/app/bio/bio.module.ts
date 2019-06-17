import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DesignBioComponent } from "./design-bio/design-bio.component";
import { DetailsBioComponent } from "./details-bio/details-bio.component";
import { PreviewBioComponent } from "./preview-bio/preview-bio.component";
import { CreateBioComponent } from "./create-bio/create-bio.component";
import { BioRoutingModule } from "./bio-routing.module";
import { BioService } from "./bio.service";

@NgModule({
  declarations: [
    DesignBioComponent,
    DetailsBioComponent,
    PreviewBioComponent,
    CreateBioComponent
  ],
  imports: [SharedModule, BioRoutingModule],
  providers: [BioService]
})
export class BioModule {}
