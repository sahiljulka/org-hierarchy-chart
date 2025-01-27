import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrTabsModule, ClarityModule } from '@clr/angular';
import { ClarityIcons, cogIcon, gridChartIcon, mapIcon, vmBugIcon } from '@cds/core/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  exports:[ClarityModule,HeaderComponent]
})
export class SharedModule {
  constructor() {
    ClarityIcons.addIcons(vmBugIcon,cogIcon,gridChartIcon,mapIcon)
  }
 }
