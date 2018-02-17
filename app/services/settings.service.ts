import * as appSettings from 'application-settings';
import {IQuestion, ISetting, State} from "../shared/questions.model";
import * as navigationModule from '../shared/navigation';

const SETTINGS:string = "SETTINGS";

export class SettingsService {

    static VERSION_NUMBER: number = 9;
    static CLEAR: boolean = false;
    static VERSION: string = "VERSION";
    static MAIN: string = "main";
    static QUICK: string = "quick";
    static QUICK1: string = "short";
    static PRACTICE: string = "practice";
    static ROUTE: string = "route";
    static QUESTIONS: string = "questions";
    DEFAULT_SETTING: ISetting = {totalQuestionsMain: 67, totalQuestionsQuick: 15};
    DEFAULT_MAIN_STATE: State = {
        questions: [],
        questionNumber: 0,
        totalQuestions: this.DEFAULT_SETTING.totalQuestionsMain
    };

    private DEFAULT_QUICK_STATE: State = {
        questions: [],
        questionNumber: 0,
        totalQuestions: this.DEFAULT_SETTING.totalQuestionsQuick
    };


    static getInstance(): SettingsService {
        return SettingsService._instance;
    }

    private static _instance: SettingsService = new SettingsService();

    constructor(){
        this.clearAll();
        this.createSetting();
    }

    public createSetting(): void {
        if (appSettings.hasKey(SETTINGS)) {
            const cacheSet: ISetting = this.readSettings();
            this.DEFAULT_MAIN_STATE.totalQuestions = cacheSet.totalQuestionsMain;
            this.DEFAULT_QUICK_STATE.totalQuestions = cacheSet.totalQuestionsQuick;
        }
        if (!appSettings.hasKey(SettingsService.MAIN)) {
            this.saveCache(SettingsService.MAIN, this.DEFAULT_MAIN_STATE);
        }
        if (!appSettings.hasKey(SettingsService.QUICK)) {
            this.saveCache(SettingsService.QUICK, this.DEFAULT_QUICK_STATE);
        }
    }

    readSettings(): ISetting {
        let setting: ISetting;
        try {
            setting = appSettings.hasKey(SETTINGS) ? JSON.parse(appSettings.getString(SETTINGS)) :
                this.DEFAULT_SETTING;
        } catch (error) {
            setting = this.DEFAULT_SETTING;
        }
        return setting;
    }

    readCache(mode: string): State {
        let state: State = appSettings.hasKey(mode) ? JSON.parse(appSettings.getString(mode)) : mode === SettingsService.MAIN? this.DEFAULT_MAIN_STATE: this.DEFAULT_QUICK_STATE;
        return state;
    }

    saveCache(mode: string, state: State): void {
        const newState: string = JSON.stringify(state);
        appSettings.setString(mode, newState);
    }

    clearCache(mode: string): void {
        appSettings.remove(mode);
    }

    clearAll(): void {
        if (SettingsService.CLEAR || !appSettings.hasKey(SettingsService.VERSION) || appSettings.getNumber(SettingsService.VERSION) < SettingsService.VERSION_NUMBER) {
            this.clearCache(SettingsService.MAIN);
            this.clearCache(SettingsService.QUICK);
            this.clearCache(SettingsService.QUESTIONS);
            this.clearCache(SettingsService.QUICK1);
            this.clearCache(SettingsService.ROUTE);
        }
        this.clearCache(SettingsService.PRACTICE);
        appSettings.setNumber(SettingsService.VERSION, SettingsService.VERSION_NUMBER);
    }

    saveSetting(setting: ISetting) {
        const newSetting: string = JSON.stringify(setting);
        appSettings.setString(SETTINGS, newSetting);
        let state: State = this.readCache(SettingsService.MAIN);
        if (setting.totalQuestionsMain > state.totalQuestions) {
            state.totalQuestions = setting.totalQuestionsMain;
            this.saveCache(SettingsService.MAIN, state);
        }
        state = this.readCache(SettingsService.QUICK);
        if (setting.totalQuestionsMain > state.totalQuestions) {
            state.totalQuestions = setting.totalQuestionsQuick;
            this.saveCache(SettingsService.QUICK, state)
        }
    }

    saveQuestions(questions: Array<IQuestion>): void {
        const json: string = JSON.stringify(questions);
        appSettings.setString(SettingsService.QUESTIONS, json);
    }

    readQuestions(): Array<IQuestion> {
        let questions: Array<IQuestion>;
        try {
            questions = this.hasQuestions() ? JSON.parse(appSettings.getString(SettingsService.QUESTIONS)) : [];
        } catch (error) {
            questions = [];
        }
        return questions;
    }

    saveRoute(path: string): void {
        appSettings.setString(SettingsService.ROUTE, path);
    }

    getRoute(): string{
        if(appSettings.hasKey(SettingsService.ROUTE)){
            return appSettings.getString(SettingsService.ROUTE);
        }
        return "question/practice";
    }

    saveScore(mode: string, percentage: number): void {
        let key = 'stats' + mode;
        if (appSettings.hasKey(key)) {
            let items: Array<number> = JSON.parse(appSettings.getString(key));
            if(items.length >= 5){
                items.shift();
            }
            items.push(percentage);
            appSettings.setString(key, JSON.stringify(items));
        } else {
            let items = new Array();
            items.push(percentage);
            appSettings.setString(key, JSON.stringify(items));
        }
    }

    getScore(mode: string): Array<number> {
        let key = 'stats' + mode;
        let items:Array<number> = [];
        if (appSettings.hasKey(key)) {
            items = JSON.parse(appSettings.getString(key));
        }
        return items;
    }

    hasQuestions(): boolean {
        return appSettings.hasKey(SettingsService.QUESTIONS);
    }

    static route(): boolean {
        let path = SettingsService.getInstance().getRoute();
        if (!path.includes(SettingsService.PRACTICE)) {
            navigationModule.toPage(path);
            return true;
        }
        return false;
    }
}