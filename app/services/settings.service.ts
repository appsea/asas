import * as appSettings from 'application-settings';
import {IQuestion, ISetting, State} from "../shared/questions.model";
import * as navigationModule from '../shared/navigation';

const SETTINGS: string = "SETTINGS";
const ADDTICK: string = "ADDTICK";

export class SettingsService {

    static VERSION_NUMBER: number = 9;
    static CLEAR: boolean = false;
    static VERSION: string = "VERSION";
    static MAIN: string = "main";
    static TICK: string = "tick";
    static QUICK: string = "quick";
    static QUICK1: string = "short";
    static PRACTICE: string = "practice";
    static ROUTE: string = "route";
    static QUESTIONS: string = "questions";
    private setting: ISetting;

    static getInstance(): SettingsService {
        return SettingsService._instance;
    }

    private static _instance: SettingsService = new SettingsService();

    constructor() {
        this.handleStructureChange();
        this.clearAll();
        this.createSetting();
    }

    public createSetting(): void {
        if (appSettings.hasKey(SETTINGS)) {
            this.setting = this.readSettings();
        } else {
            this.setting = this.getDefaultSetting();
            appSettings.setString(SETTINGS, JSON.stringify(this.setting));
        }
        if (!appSettings.hasKey(SettingsService.MAIN)) {
            this.saveCache(SettingsService.MAIN, this.getDefaultMain());
        }
        if (!appSettings.hasKey(SettingsService.QUICK)) {
            this.saveCache(SettingsService.QUICK, this.getDefaultQuick());
        }
        if (!appSettings.hasKey(SettingsService.TICK)) {
            this.saveCache(SettingsService.TICK, this.getDefaultTick());
        }
    }

    readSettings(): ISetting {
        let setting: ISetting;
        try {
            setting = appSettings.hasKey(SETTINGS) ? JSON.parse(appSettings.getString(SETTINGS)) : this.getDefaultSetting();
        } catch (error) {
            setting = this.getDefaultSetting();
        }
        return setting;
    }

    readCache(mode: string): State {
        let state: State;
        if(appSettings.hasKey(mode)){
            state = JSON.parse(appSettings.getString(mode));
        }else if(mode === SettingsService.MAIN){
            state = this.getDefaultMain();
        }else if(mode === SettingsService.QUICK){
            state = this.getDefaultQuick();
        }else if(mode === SettingsService.TICK){
            state = this.getDefaultTick();
        }
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
        if (setting.totalQuestionsQuick > state.totalQuestions) {
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

    getRoute(): string {
        if (appSettings.hasKey(SettingsService.ROUTE)) {
            return appSettings.getString(SettingsService.ROUTE);
        }
        return "question/practice";
    }

    saveScore(mode: string, percentage: number): void {
        let key = 'stats' + mode;
        if (appSettings.hasKey(key)) {
            let items: Array<number> = JSON.parse(appSettings.getString(key));
            if (items.length >= 5) {
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
        let items: Array<number> = [];
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

    private getDefaultQuick() {
        return {
            questions: [],
            questionNumber: 0,
            totalQuestions: this.setting.totalQuestionsQuick
        };
    }

    private getDefaultMain() {
        return {
            questions: [],
            questionNumber: 0,
            totalQuestions: this.setting.totalQuestionsMain
        };
    }

    private getDefaultTick() {
        return {
            questions: [],
            questionNumber: 0,
            totalQuestions: this.setting.totalQuestionsTick,
            time: this.setting.totalTime
        };
    }

    private handleStructureChange() {
        if (appSettings.hasKey(SETTINGS) && !appSettings.hasKey(ADDTICK)) {
            let setting: ISetting = JSON.parse(appSettings.getString(SETTINGS));
            setting.totalQuestionsTick = this.getDefaultSetting().totalQuestionsTick;
            setting.totalTime = this.getDefaultSetting().totalTime;
            appSettings.setString(SETTINGS, JSON.stringify(setting));
            appSettings.setBoolean(ADDTICK, true);
        }else{
            console.log("Settings handled..." + this.readSettings().totalTime + this.readSettings().totalQuestionsTick);
        }
    }

    private getDefaultSetting() {
        return {
            totalQuestionsMain: 67,
            totalQuestionsQuick: 15,
            totalTime: 60,
            totalQuestionsTick: 67
        };
    }
}