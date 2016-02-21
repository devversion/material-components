import {Component} from "angular2/core";
import {Toolbar} from "../toolbar/toolbar";
import {ViewEncapsulation} from "angular2/core";

@Component({
    selector: 'app',
    templateUrl: 'dist/src/components/app/app.html',
    styleUrls: [
        'dist/src/components/app/app.css'
    ],
    directives: [
        Toolbar
    ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

}