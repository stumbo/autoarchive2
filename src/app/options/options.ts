import { Component } from '@angular/core'
import {advancedTab} from "./advanced/advancedTab";

@Component( {
  selector: 'app-root',
  templateUrl: './options.html',
  styleUrls: ['./options.css']
})
export class Options {
  title = 'Auto Archive Settings and more...'
}
