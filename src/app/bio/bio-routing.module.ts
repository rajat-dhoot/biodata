import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DetailsBioComponent } from "./details-bio/details-bio.component";
import { CreateBioComponent } from "./create-bio/create-bio.component";
import { DownloadBioComponent } from "./download-bio/download-bio.component";
import { CanDeactivateGuard } from "./services/can-deactivate-guard.service";

const routes: Routes = [
  {
    path: "create",
    component: CreateBioComponent,
    children: [
      {
        path: "details",
        component: DetailsBioComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: "download",
        component: DownloadBioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioRoutingModule {}
