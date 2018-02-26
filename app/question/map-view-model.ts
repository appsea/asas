import {EventData, Observable} from "data/observable";
import {State} from "../shared/questions.model";
import {ObservableArray} from "tns-core-modules/data/observable-array/observable-array";
import {GridItemEventData} from "nativescript-grid-view";
import * as navigationModule from '../shared/navigation';
import {SettingsService} from "../services/settings.service";
import {QuestionUtil} from "../services/question.util";

export class MapViewModel extends Observable {
    private _state: State;
    public items = new ObservableArray();
    private _color: string = "#5681FE";

    constructor(state: State) {
        super();
        this._state = state;
        for (let loop = 0; loop < state.totalQuestions; loop++) {
            let status: string = "all";
            if(state.questions.length>loop){
                if(QuestionUtil.isSkipped(state.questions[loop])){
                    status = 'skipped';
                }
            }else{
                status = 'tbd';
            }
            this.items.push({value: (loop + 1), status: status});
        }

        this.publish();
    }

    private publish() {
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'state',
            value: this._state
        });
    }

    get totalQuestions() {
        return this._state.questions.length;
    }

    get state() {
        return this._state;
    }

    get color() {
        return this._color;
    }

    gridViewItemTap(args: GridItemEventData) {
        if (this.state.questions.length > args.index) {
            this.state.questionNumber = args.index + 1;
            SettingsService.getInstance().saveCache(this.state.mode, this.state);
            navigationModule.toPage("question/practice")
        }
    }
}