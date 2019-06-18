import { NgModule } from "@angular/core";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatStepperModule,
  MatNativeDateModule,
  MatDatepickerModule
} from "@angular/material";

const MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatStepperModule,
  // These modules include providers.
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTooltipModule
];

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {}
