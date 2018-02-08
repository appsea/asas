"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appSettings = require("application-settings");
var SETTINGS = "SETTINGS";
var SettingsService = /** @class */ (function () {
    function SettingsService() {
        this.DEFAULT_SETTING = { totalQuestionsMain: 67, totalQuestionsQuick: 15 };
        this.DEFAULT_STATE = { questions: [], questionNumber: 0, totalQuestions: 15 };
        this.DEFAULT_MAIN_STATE = {
            questions: [],
            questionNumber: 0,
            totalQuestions: this.DEFAULT_SETTING.totalQuestionsMain
        };
        this.DEFAULT_QUICK_STATE = {
            questions: [],
            questionNumber: 0,
            totalQuestions: this.DEFAULT_SETTING.totalQuestionsQuick
        };
        this.clearAll();
        this.createSetting();
    }
    SettingsService.getInstance = function () {
        return SettingsService._instance;
    };
    SettingsService.prototype.createSetting = function () {
        if (appSettings.hasKey(SETTINGS)) {
            var cacheSet = this.readSettings();
            this.DEFAULT_MAIN_STATE.totalQuestions = cacheSet.totalQuestionsMain;
            this.DEFAULT_QUICK_STATE.totalQuestions = cacheSet.totalQuestionsQuick;
        }
        if (!appSettings.hasKey(SettingsService.MAIN)) {
            this.saveCache(SettingsService.MAIN, this.DEFAULT_MAIN_STATE);
        }
        if (!appSettings.hasKey(SettingsService.QUICK)) {
            this.saveCache(SettingsService.QUICK, this.DEFAULT_QUICK_STATE);
        }
    };
    SettingsService.prototype.readSettings = function () {
        var setting;
        try {
            setting = appSettings.hasKey(SETTINGS) ? JSON.parse(appSettings.getString(SETTINGS)) :
                this.DEFAULT_SETTING;
        }
        catch (error) {
            setting = this.DEFAULT_SETTING;
        }
        return setting;
    };
    SettingsService.prototype.readCache = function (mode) {
        var state;
        try {
            state = appSettings.hasKey(mode) ? JSON.parse(appSettings.getString(mode)) : this.DEFAULT_STATE;
        }
        catch (error) {
            state = this.DEFAULT_STATE;
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
        }
        this.clearCache(SettingsService.PRACTICE);
        appSettings.setNumber(SettingsService.VERSION, SettingsService.VERSION_NUMBER);
    };
    SettingsService.prototype.saveSetting = function (setting) {
        var newSetting = JSON.stringify(setting);
        appSettings.setString(SETTINGS, newSetting);
        var state = this.readCache(SettingsService.MAIN);
        if (setting.totalQuestionsMain > state.totalQuestions) {
            state.totalQuestions = setting.totalQuestionsMain;
            this.saveCache(SettingsService.MAIN, state);
        }
        state = this.readCache(SettingsService.QUICK);
        if (setting.totalQuestionsMain > state.totalQuestions) {
            state.totalQuestions = setting.totalQuestionsQuick;
            this.saveCache(SettingsService.QUICK, state);
        }
    };
    SettingsService.prototype.saveQuestions = function (questions) {
        var json = JSON.stringify(questions);
        appSettings.setString(SettingsService.QUESTIONS, json);
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
    SettingsService.prototype.hasQuestions = function () {
        return appSettings.hasKey(SettingsService.QUESTIONS);
    };
    SettingsService.VERSION_NUMBER = 9;
    SettingsService.CLEAR = false;
    SettingsService.VERSION = "VERSION";
    SettingsService.MAIN = "main";
    SettingsService.QUICK = "quick";
    SettingsService.QUICK1 = "short";
    SettingsService.PRACTICE = "practice";
    SettingsService.QUESTIONS = "questions";
    SettingsService._instance = new SettingsService();
    return SettingsService;
}());
exports.SettingsService = SettingsService;
