import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DesignBioComponent } from "./design-bio/design-bio.component";
import { DetailsBioComponent } from "./details-bio/details-bio.component";
import { PreviewBioComponent } from "./preview-bio/preview-bio.component";
import { CreateBioComponent } from "./create-bio/create-bio.component";
import { CanDeactivateGuard } from "./can-deactivate-guard.service";

const routes: Routes = [
  {
    path: "create",
    component: CreateBioComponent,
    children: [
      {
        path: "design",
        component: DesignBioComponent
      },
      {
        path: "details",
        component: DetailsBioComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: "",
        redirectTo: "design",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioRoutingModule {}
