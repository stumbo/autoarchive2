import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { OptionsComponent } from './options/options';
import { PopupComponent } from './popup/popup';
import { advancedTab } from './options/advanced/advancedTab';
import { basicTab } from './options/general/basicTab';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [OptionsComponent, PopupComponent, advancedTab, basicTab],
  imports: [BrowserModule, RouterModule],
  providers: [],
  bootstrap: [OptionsComponent],
})
export class AppModule {}
