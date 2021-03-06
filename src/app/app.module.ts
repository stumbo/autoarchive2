import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Options} from "./options/options";
import {Popup} from "./popup/popup";

@NgModule({
  declarations: [
    Options,
    Popup
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [Options]
})
export class AppModule { }
