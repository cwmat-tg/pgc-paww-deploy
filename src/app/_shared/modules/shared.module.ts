import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { VersionComponent } from '../components/version/version.component';
import { IntroHelperTextComponent } from '../components/intro-helper-text/intro-helper-text.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoPopupComponent } from '../components/info-popup/info-popup.component';
import { InfoDialogComponent } from '../components/info-dialog/info-dialog.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule 
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    VersionComponent,
    IntroHelperTextComponent,
    InfoPopupComponent,
    InfoDialogComponent,
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    VersionComponent,
    IntroHelperTextComponent,
    InfoPopupComponent,
    InfoDialogComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {}
