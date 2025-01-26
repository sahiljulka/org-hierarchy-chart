import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrTabsModule, ClarityModule } from '@clr/angular';
import { ClarityIcons, cogIcon, gridChartIcon, mapIcon, vmBugIcon } from '@cds/core/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  exports:[ClarityModule]
})
export class SharedModule {
  constructor() {
    ClarityIcons.addIcons(vmBugIcon,cogIcon,gridChartIcon,mapIcon)
  }
 }
