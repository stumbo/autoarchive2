import {advancedTab} from "./options/advanced/advancedTab";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {basicTab} from "./options/general/basicTab";

const routes: Routes = [
  {
    path: "",
    component: basicTab
  },
  {
    path: "advanced",
    component: advancedTab
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
