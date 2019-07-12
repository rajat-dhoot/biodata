import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./modules/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TimeFormat } from "./pipes/time.pipe";
import { CapitalizePipe } from "./pipes/capitalize.pipe";

@NgModule({
  declarations: [TimeFormat, CapitalizePipe],
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizePipe,
    TimeFormat,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
