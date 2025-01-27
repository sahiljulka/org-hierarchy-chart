import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrTabsModule, ClarityModule } from '@clr/angular';
import { ClarityIcons, cogIcon, gridChartIcon, mapIcon, vmBugIcon } from '@cds/core/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AlertComponent } from './components/alert/alert.component';



@NgModule({
  declarations: [
    HeaderComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  exports:[ClarityModule,HeaderComponent,AlertComponent]
})
export class SharedModule {
  constructor() {
    ClarityIcons.addIcons(vmBugIcon,cogIcon,gridChartIcon,mapIcon)
  }
 }
