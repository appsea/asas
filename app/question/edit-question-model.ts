import {EventData, Observable} from "data/observable";
import {IOption, IQuestion, State} from "../shared/questions.model";
import {QuestionService} from "../services/question.service";

export class EditQuestionViewModel extends Observable {
    private _state: State;
    private _question: IQuestion;

    constructor(state: State) {
        super();
        this._question = state.questions[state.questionNumber - 1];
        this._state = state;
        this.publish();
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
            propertyName: 'state',
            value: this._state
        });
    }

    get question() {
        return this._question;
    }

    get state(){
        return this._state;
    }

    save() {
        QuestionService.getInstance().update(this._question);
    }

    selectOption(args: any) {
        let selectedOption: IOption = args.view.bindingContext;
        if(selectedOption.selected){
            selectedOption.selected = false;
        }else{
            this.question.options.forEach((item, index) => {
                if (item.tag === selectedOption.tag) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
        }
    }
}