import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Options} from "./options/options";
import {Popup} from "./popup/popup";
import {advancedTab} from "./options/advanced/advancedTab";
import {basicTab} from "./options/general/basicTab";

@NgModule({
  declarations: [
    Options,
    Popup,
    advancedTab,
    basicTab
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [Options]
})
export class AppModule { }
