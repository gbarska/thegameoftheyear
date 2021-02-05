import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NavbarComponent } from './navbar/navbar.component';
import { HorizontalBarGraphicComponent } from './horizontal-bar-graphic/horizontal-bar-graphic.component';

@NgModule({
  declarations: [NavbarComponent, HorizontalBarGraphicComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  exports: [
  NavbarComponent,
  HorizontalBarGraphicComponent
  ]
})
export class ComponentsModule { }
