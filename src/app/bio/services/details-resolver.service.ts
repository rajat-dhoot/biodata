import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { BioService } from "./bio.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable()
export class DetailsResolverService implements Resolve<FormGroup> {
  constructor(private _bioservice: BioService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._bioservice.getDetailsModel();
  }
}
