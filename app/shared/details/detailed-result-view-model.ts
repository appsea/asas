import {EventData, Observable} from "data/observable";
import {IQuestionWrapper, State} from "../questions.model";

export class DetailedResultViewModel extends Observable {
    private _questions: Array<IQuestionWrapper>;
    private allQuestions: Array<IQuestionWrapper>;
    private _message: string;

    constructor(state: State) {
        super();
        this.allQuestions = state.questions;
        this.all();
    }

    private publish() {
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'questions',
            value: this._questions
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'totalQuestions',
            value: this.totalQuestions
        });
        this.notify({
            object: this,
            eventName: Observable.propertyChangeEvent,
            propertyName: 'message',
            value: this._message
        });
    }

    all(): void {
        this._message = "All";
        this.allQuestions.forEach(que=> {
           if(this.isSkipped(que)){
               que.question.skipped = true;
           } else{
               que.question.skipped = false;
           }
        });
        this._questions = this.allQuestions;
        this.publish();
    }

    correct(): void {
        this._message = "Correct";
        this._questions = this.allQuestions.filter(question=> this.isCorrect(question));
        this.publish();
    }

    incorrect(): void {
        this._questions = this.allQuestions.filter(question=> !this.isSkipped(question) && !this.isCorrect(question));
        this._message = "Incorrect";
        this.publish();
    }

    skipped(): void {
        this._message = "Skipped";
        this._questions = this.allQuestions.filter(question=> this.isSkipped(question));
        this.publish();
    }

    get totalQuestions() {
        return this.questions.length;
    }

    get message() {
        return this._message;
    }

    get questions() {
        return this._questions;
    }

    get getColor() {
        return 'skipped';
    }

    private isCorrect(question: IQuestionWrapper) {
        let isCorrect = false;
        for (const option of question.question.options) {
            if (option.selected && option.correct) {
                isCorrect = true;
                break;
            }
        }
        return isCorrect;
    }

    private isSkipped(question: IQuestionWrapper) {
        let isSkipped = true;
        for (const option of question.question.options) {
            if (option.selected) {
                isSkipped = false;
                break;
            }
        }
        return isSkipped;
    }
}