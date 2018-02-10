import {EventData, Observable} from "data/observable";
import {State} from "../questions.model";
import * as navigationModule from '../navigation';

export class ResultViewModel extends Observable {
    _correct: number = 0;
    _percentage: string = "0";
    private _state: State;
    private _wrong: number = 0;

    constructor(state: State) {
        super();
        this._state = state;
        this.calculateResult();
        this.initData();
    }

    private initData() {
        this.set("pieSource",
            [
                { Brand: "Audi", Amount: 10 },
                { Brand: "Mercedes", Amount: 76 },
                { Brand: "Fiat", Amount: 60 },
                { Brand: "BMW", Amount: 24 },
                { Brand: "Crysler", Amount: 40 }
            ]);

        this.set("sourceItems", [
            { Name: "Groceries", Sales: 25, Margin: 10 },
            { Name: "Tools", Sales: 34, Margin: 20 },
            { Name: "Electronics", Sales: 15, Margin: 25 },
            { Name: "Gardening", Sales: 40, Margin: 5 }
        ]);

    }

    private publish() {
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'state',
            value: this._state
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'wrong',
            value: this._wrong
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'percentage',
            value: this._percentage
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'correct',
            value: this._correct
        });
    }

    private showDetailedResult() {
        navigationModule.gotoResultPage(this._state);
    }

    showAnswer(): void {
    }

    public calculateResult(): void {
        let isCorrect: boolean;

        for (const question of this._state.questions) {
            isCorrect = false;
            for (const option of question.options) {
                if (option.selected && option.correct) {
                    isCorrect = true;
                    break;
                }
            }
            if (isCorrect) {
                this._correct = this._correct + 1;
            } else {
                this._wrong = this._wrong + 1;
            }
        }
        this._percentage = (this._correct * 100 / this._state.questions.length).toFixed(2);
        this.publish();
    }

    get wrong() {
        return this._wrong;
    }

    get correct() {
        return this._correct;
    }

    get percentage() {
        return this._percentage;
    }

    get totalQuestions() {
        return this._state.questions.length;
    }

    get state() {
        return this._state;
    }

    detailedResult() {
        navigationModule.gotoDetailsPage(this._state);
    }
}