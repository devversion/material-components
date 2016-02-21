import {Component} from "angular2/core";
import {ViewEncapsulation} from "angular2/core";

import {MdToolbar} from "../toolbar/toolbar";
import {MdButton} from "../button/button";
import {MdSwitch} from "../switch/switch";
import {MdCheckbox} from "../checkbox/checkbox";

@Component({
  selector: 'app',
  templateUrl: 'dist/src/components/app/app.html',
  styleUrls: [
    'dist/src/components/app/app.css'
  ],
  directives: [
    MdToolbar,
    MdButton,
    MdSwitch,
    MdCheckbox
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  isSwitchChecked: boolean = true;
  isCheckboxChecked: boolean = true;

}