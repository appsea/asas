import {EventData, Observable} from "data/observable";
import {BookmarkQuestionModel} from "./bookmark-question-model";
import {PersistenceService} from "../services/persistence.service";

export class WrongQuestionModel extends BookmarkQuestionModel {

    private static message: string = "Hurray!! No more wrong questions. Click Ok to go to practice.";

    constructor() {
        super(PersistenceService.getInstance().readWrongQuestions(), "wrong");
        super.next(WrongQuestionModel.message);
    }

    next(): void {
        super.next(WrongQuestionModel.message);
    }
}