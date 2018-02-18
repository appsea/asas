import * as dialogs from "ui/dialogs";
import {EventData, Observable} from "data/observable";
import {IOption, IQuestion, State} from "../shared/questions.model";
import {QuestionService} from "../services/question.service";
import {SettingsService} from "../services/settings.service";
import * as navigationModule from '../shared/navigation';
import {setInterval, setTimeout, clearInterval} from "timer";

export class TimerViewModel extends Observable {
    private _questionService: QuestionService;
    private _settingsService: SettingsService;

    private _question: IQuestion;
    private _state: State;
    private _questionNumber: number;

    private _showAnswerFlag: boolean;
    private _mode: string;
    private _seconds: number = 0;
    private _minutes: number = 1;
    private _time: string;

    constructor(mode: string) {
        super();
        this._questionService = QuestionService.getInstance();
        this._settingsService = SettingsService.getInstance();
        this._state = this._settingsService.readCache(mode);
        this._mode = mode;
        this.showFromState();
        const clock = setInterval(() => {
            if (this._seconds == 0) {
                this._seconds = 10;
                this._minutes--;
                if(this._minutes==-1){
                    clearTimeout(clock);
                    this.showResult();
                }
            } else {
                this._seconds--;
            }
            this._time = (("0" + this._minutes).slice(-2)) + ":"+(("0" + this._seconds).slice(-2));
            this.publish();
        }, 1000);
    }

    private showFromState(): void {
        if (this._state.questionNumber != 0 && (this._state.questions.length >= this._state.questionNumber || this._state.questionNumber === this._state.totalQuestions)) {
            this._question = this._state.questions[this._state.questionNumber - 1];
        } else {
            this.next();
        }
    }

    public previous(): void {
        this._showAnswerFlag = false;
        if (this._state.questionNumber > 1) {
            this._state.questionNumber = this._state.questionNumber - 1;
            this._question = this._state.questions[this._state.questionNumber - 1];
            this._settingsService.saveCache(this._mode, this._state);
            this.publish();
        }
    }

    next(): void {
        if ((this._state.questionNumber < this._state.totalQuestions) || this.isPractice()) {
            if (this._state.questions.length > 0 && this._state.questions.length > this._state.questionNumber) {
                this._state.questionNumber = this._state.questionNumber + 1;
                this._question = this._state.questions[this._state.questionNumber - 1];
                this._settingsService.saveCache(this._mode, this._state);
                this.publish();
            } else {
                this._questionService.getNextQuestion().then((que: IQuestion) => {
                    this._state.questionNumber = this._state.questionNumber + 1;
                    this._question = que;
                    this._state.questions.push(this._question);
                    this._settingsService.saveCache(this._mode, this._state);
                    this.publish();
                });
            }
        }
    }

    quit(): void {
        dialogs.confirm("Are you sure you want to quit?").then((proceed) => {
            if (proceed) {
                this.showResult();
            }
        });
    }

    submit(): void {
        dialogs.confirm("Are you sure you want to submit?").then((proceed) => {
            if (proceed) {
                this.showResult();
            }
        });
    }

    get question() {
        if (!this._question) {
            this._question = {description: '', options: []}
        }
        return this._question;
    }


    get state() {
        return this._state;
    }

    get allQuestionsAsked() {
        return this._state.questions.length == this._state.totalQuestions;
    }

    isPractice(): boolean {
        return this._mode === SettingsService.PRACTICE;
    }

    get options() {
        return this._question.options;
    }

    get questionNumber() {
        this._questionNumber = this._state.questionNumber;
        return this._questionNumber;
    }

    get message() {
        return this.message;
    }

    get showAnswerFlag() {
        return this._showAnswerFlag;
    }

    get time() {
        return this._time;
    }

    private publish() {
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'question',
            value: this._question
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'options',
            value: this._question.options
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'state',
            value: this._state
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'questionNumber',
            value: this._state.questionNumber
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'showAnswerFlag',
            value: this._showAnswerFlag
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'time',
            value:  this._time
        });
    }

    private showResult() {
        console.log("CLearing " + this._mode);
        this._settingsService.clearCache(this._mode);
        this._state.mode = this._mode;
        navigationModule.gotoResultPage(this._state);
    }

    showAnswer(): void {
        this.question.options.forEach(option => option.show = true);
        this.publish();
    }

    selectOption(args: any) {
        let selectedOption: IOption = args.view.bindingContext;
        this.question.options.forEach((item, index) => {
            if (item.tag === selectedOption.tag) {
                item.selected = true;
            } else {
                item.selected = false;
            }
        });
        this.question.skipped = false;
        this.publish();
    }
}