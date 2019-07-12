import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateBioComponent } from "./create-bio/create-bio.component";
import { DetailsBioComponent } from "./details-bio/details-bio.component";
import { DownloadBioComponent } from "./download-bio/download-bio.component";
import { CanDeactivateGuard } from "./services/can-deactivate-guard.service";
import { DetailsResolverService } from "./services/details-resolver.service";

const routes: Routes = [
  {
    path: "create",
    component: CreateBioComponent,
    children: [
      {
        path: "details",
        component: DetailsBioComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: { detailsModel: DetailsResolverService }
      },
      {
        path: "download",
        component: DownloadBioComponent
      },
      {
        path: "",
        redirectTo: "details",
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
