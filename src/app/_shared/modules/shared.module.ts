import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { VersionComponent } from '../components/version/version.component';
import { IntroHelperTextComponent } from '../components/intro-helper-text/intro-helper-text.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    VersionComponent,
    IntroHelperTextComponent
  ],
  declarations: [
    VersionComponent,
    IntroHelperTextComponent
  ]
})
export class SharedModule {}
