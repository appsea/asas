import * as dialogs from "ui/dialogs";
import {EventData, Observable} from "data/observable";
import {IOption, IQuestion, IQuestionWrapper, State} from "../shared/questions.model";
import {QuestionService} from "../services/question.service";
import {SettingsService} from "../services/settings.service";
import * as navigationModule from '../shared/navigation';

export class HomeViewModel extends Observable {
    private _questionService: QuestionService;
    private _settingsService: SettingsService;

    private _question: IQuestionWrapper;
    private _state: State;
    private _questionNumber: number;

    private showAnswerFlag: boolean;

    constructor() {
        super();
        this._questionService = QuestionService.getInstance();
        this._settingsService = SettingsService.getInstance();
        this._settingsService.clearAll();
        this._state = this._settingsService.readCache(SettingsService.MAIN);
        this.showFromState();
    }

    private showFromState(): void {
        if (this._state.questions.length > this._state.questionNumber || this._state.questionNumber === this._state.totalQuestions) {
            this._question = this._state.questions[this._state.questionNumber - 1];
        } else {
            this.next();
        }
    }

    public previous(): void {
        this.showAnswerFlag = false;
        if (this._state.questionNumber > 1) {
            this._state.questionNumber = this._state.questionNumber - 1;
            this._question = this._state.questions[this._state.questionNumber - 1];
            this._settingsService.saveCache("main", this._state);
            this.publish();
        }
    }

    next(): void {
        if (this._state.questionNumber < this._state.totalQuestions) {
            if (this._state.questions.length>0 && this._state.questions.length > this._state.questionNumber) {
                this._state.questionNumber = this._state.questionNumber + 1;
                this._question = this._state.questions[this._state.questionNumber - 1];
                this.publish();
            } else {
                this._questionService.getNextQuestion().then((que: IQuestion) => {
                    this._state.questionNumber = this._state.questionNumber + 1;
                    this._question = {question: que};
                    this._state.questions.push(this._question);
                    this.publish();
                });
            }
        }
        this._settingsService.saveCache("main", this._state);
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
        if(!this._question){
            this._question = {question: {description:'' , options: []}};
        }
        return this._question;
    }

    get state() {
        return this._state;
    }

    get allQuestionsAsked() {
        return this._state.questions.length === this._state.totalQuestions;
    }

    get isPractice() {
        return false;
    }

    get options() {
        return this._question.question.options;
    }

    get questionNumber() {
        this._questionNumber = this._state.questionNumber;
        return this._questionNumber;
    }

    get message() {
        return this.message;
    }

    private publish() {
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'question', value: this._question});
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'options', value: this._question.question.options});
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'state', value: this._state});
        this.notify({ object: this, eventName: Observable.propertyChangeEvent, propertyName: 'questionNumber', value: this._state.questionNumber});
    }

    private showResult() {
        this._settingsService.clearCache(SettingsService.MAIN);
        navigationModule.gotoResultPage(this._state);
    }

    showAnswer(): void {
        this.showAnswerFlag = true;
    }

    selectOption(args: any) {
        let selectedOption:IOption = args.view.bindingContext;
        this.question.question.options.forEach((item, index) => {
            if(item.tag === selectedOption.tag){
                item.selected = true;
            }else{
                item.selected = false;
            }
        });
        this.question.question.skipped = false;
        this.publish();
    }
}