import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./modules/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TimeFormat } from "./pipes/time.pipe";
import { SanitizeHtmlPipe } from "./pipes/sanitize.pipe";

@NgModule({
  declarations: [TimeFormat, SanitizeHtmlPipe],
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TimeFormat,
    SanitizeHtmlPipe,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule {}
