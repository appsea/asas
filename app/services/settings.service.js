"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appSettings = require("application-settings");
var navigationModule = require("../shared/navigation");
var SETTINGS = "SETTINGS";
var ADDTICK = "ADDTICK";
var SettingsService = /** @class */ (function () {
    function SettingsService() {
        this.handleStructureChange();
        this.clearAll();
        this.createSetting();
    }
    SettingsService.getInstance = function () {
        return SettingsService._instance;
    };
    SettingsService.prototype.createSetting = function () {
        if (appSettings.hasKey(SETTINGS)) {
            this.setting = this.readSettings();
        }
        else {
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
    };
    SettingsService.prototype.readSettings = function () {
        var setting;
        try {
            setting = appSettings.hasKey(SETTINGS) ? JSON.parse(appSettings.getString(SETTINGS)) : this.getDefaultSetting();
        }
        catch (error) {
            setting = this.getDefaultSetting();
        }
        return setting;
    };
    SettingsService.prototype.readCache = function (mode) {
        var state;
        if (appSettings.hasKey(mode)) {
            state = JSON.parse(appSettings.getString(mode));
        }
        else if (mode === SettingsService.MAIN) {
            state = this.getDefaultMain();
        }
        else if (mode === SettingsService.QUICK) {
            state = this.getDefaultQuick();
        }
        else if (mode === SettingsService.TICK) {
            state = this.getDefaultTick();
        }
        else {
            state = this.getDefaultQuick();
        }
        return state;
    };
    SettingsService.prototype.saveCache = function (mode, state) {
        var newState = JSON.stringify(state);
        appSettings.setString(mode, newState);
    };
    SettingsService.prototype.clearCache = function (mode) {
        appSettings.remove(mode);
    };
    SettingsService.prototype.clearAll = function () {
        if (SettingsService.CLEAR || !appSettings.hasKey(SettingsService.VERSION) || appSettings.getNumber(SettingsService.VERSION) < SettingsService.VERSION_NUMBER) {
            this.clearCache(SettingsService.MAIN);
            this.clearCache(SettingsService.QUICK);
            this.clearCache(SettingsService.QUESTIONS);
            this.clearCache(SettingsService.QUICK1);
            this.clearCache(SettingsService.ROUTE);
        }
        this.clearCache(SettingsService.PRACTICE);
        appSettings.setNumber(SettingsService.VERSION, SettingsService.VERSION_NUMBER);
    };
    SettingsService.prototype.saveSetting = function (setting) {
        var newSetting = JSON.stringify(setting);
        appSettings.setString(SETTINGS, newSetting);
    };
    SettingsService.prototype.saveQuestions = function (questions) {
        var json = JSON.stringify(questions);
        appSettings.setString(SettingsService.QUESTIONS, json);
        appSettings.setNumber(SettingsService.QUESTIONS_SIZE, questions.length);
    };
    SettingsService.prototype.saveVersion = function (fbVersion) {
        appSettings.setNumber(SettingsService.FB_VERSION, fbVersion);
    };
    SettingsService.prototype.readVersion = function () {
        return appSettings.hasKey(SettingsService.FB_VERSION) ? appSettings.getNumber(SettingsService.FB_VERSION) : 0;
    };
    SettingsService.prototype.readQuestions = function () {
        var questions;
        try {
            questions = this.hasQuestions() ? JSON.parse(appSettings.getString(SettingsService.QUESTIONS)) : [];
        }
        catch (error) {
            questions = [];
        }
        return questions;
    };
    SettingsService.prototype.saveRoute = function (path) {
        appSettings.setString(SettingsService.ROUTE, path);
    };
    SettingsService.prototype.getRoute = function () {
        if (appSettings.hasKey(SettingsService.ROUTE)) {
            return appSettings.getString(SettingsService.ROUTE);
        }
        return "question/practice";
    };
    SettingsService.prototype.saveScore = function (mode, percentage) {
        var key = 'stats' + mode;
        if (appSettings.hasKey(key)) {
            var items = JSON.parse(appSettings.getString(key));
            if (items.length >= 5) {
                items.shift();
            }
            items.push(percentage);
            appSettings.setString(key, JSON.stringify(items));
        }
        else {
            var items = new Array();
            items.push(percentage);
            appSettings.setString(key, JSON.stringify(items));
        }
    };
    SettingsService.prototype.getScore = function (mode) {
        var key = 'stats' + mode;
        var items = [];
        if (appSettings.hasKey(key)) {
            items = JSON.parse(appSettings.getString(key));
        }
        return items;
    };
    SettingsService.prototype.hasQuestions = function () {
        return appSettings.hasKey(SettingsService.QUESTIONS);
    };
    SettingsService.route = function () {
        var path = SettingsService.getInstance().getRoute();
        if (!path.includes(SettingsService.PRACTICE)) {
            navigationModule.toPage(path);
            return true;
        }
        return false;
    };
    SettingsService.prototype.getDefaultQuick = function () {
        return {
            questions: [],
            questionNumber: 0,
            totalQuestions: this.readSettings().totalQuestionsQuick
        };
    };
    SettingsService.prototype.getDefaultMain = function () {
        return {
            questions: [],
            questionNumber: 0,
            totalQuestions: this.readSettings().totalQuestionsMain
        };
    };
    SettingsService.prototype.getDefaultTick = function () {
        return {
            questions: [],
            questionNumber: 0,
            totalQuestions: this.readSettings().totalQuestionsTick,
            time: this.readSettings().totalTime
        };
    };
    SettingsService.prototype.handleStructureChange = function () {
        if (appSettings.hasKey(SETTINGS) && !appSettings.hasKey(ADDTICK)) {
            var setting = JSON.parse(appSettings.getString(SETTINGS));
            setting.totalQuestionsTick = this.getDefaultSetting().totalQuestionsTick;
            setting.totalTime = this.getDefaultSetting().totalTime;
            appSettings.setString(SETTINGS, JSON.stringify(setting));
            appSettings.setBoolean(ADDTICK, true);
        }
    };
    SettingsService.prototype.getDefaultSetting = function () {
        return {
            totalQuestionsMain: 67,
            totalQuestionsQuick: 15,
            totalTime: 110,
            totalQuestionsTick: 65
        };
    };
    SettingsService.prototype.hasSize = function () {
        return appSettings.hasKey(SettingsService.QUESTIONS_SIZE);
    };
    SettingsService.prototype.allQuestionsAsked = function (alreadyAsked) {
        return this.hasSize() ? alreadyAsked < appSettings.getNumber(SettingsService.QUESTIONS_SIZE) : alreadyAsked < 449;
    };
    SettingsService.VERSION_NUMBER = 10;
    SettingsService.CLEAR = false;
    SettingsService.VERSION = "VERSION";
    SettingsService.FB_VERSION = "FB_VERSION";
    SettingsService.MAIN = "main";
    SettingsService.TICK = "tick";
    SettingsService.QUICK = "quick";
    SettingsService.QUICK1 = "short";
    SettingsService.PRACTICE = "practice";
    SettingsService.ROUTE = "route";
    SettingsService.QUESTIONS = "questions";
    SettingsService.QUESTIONS_SIZE = "size";
    SettingsService._instance = new SettingsService();
    return SettingsService;
}());
exports.SettingsService = SettingsService;
