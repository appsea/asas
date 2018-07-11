/**
 * Created by rakesh on 15-Nov-2017.
 */
import {Observable} from "rxjs/Observable";
import {HttpService} from "./http.service";
import * as constantsModule from '../shared/constants';
import {QuizUtil} from "../shared/quiz.util";

export class GeneralService {

    static getInstance(): GeneralService {
        return GeneralService._instance;
    }

    private static _instance: GeneralService = new GeneralService();

    public logError(error: any) {
        let url = constantsModule.FIREBASE_URL + "error.json";
        var errorWithDate = {error: error.message, date: QuizUtil.getDate()};
        HttpService.getInstance().httpPost(url, errorWithDate);
    }
}