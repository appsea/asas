"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_service_1 = require("./settings.service");
var firebase = require("nativescript-plugin-firebase");
var dialogs = require("ui/dialogs");
var connection_service_1 = require("../shared/connection.service");
var QuestionService = /** @class */ (function () {
    function QuestionService() {
        this.questions = [];
        this._settingsService = new settings_service_1.SettingsService();
    }
    QuestionService.prototype.getNextQuestion = function () {
        return this.getFirebaseQuestion();
    };
    QuestionService.prototype.getRandomNumber = function (max) {
        var randomNumber = Math.floor(Math.random() * (max));
        return randomNumber;
    };
    QuestionService.prototype.getFirebaseQuestion = function () {
        if (this.questions.length != 0) {
            return this.readFromQuestions();
        }
        else {
            if (this._settingsService.hasQuestions()) {
                this.questions = this._settingsService.readQuestions();
                return this.readFromQuestions();
            }
            else {
                if (!connection_service_1.ConnectionService.getInstance().isConnected()) {
                    dialogs.alert("Please connect to internet just once so that we can prepare quality questions for you!!");
                }
                else {
                    this.readAllQuestions();
                }
            }
        }
        return this.getNextQuestionFromCache();
    };
    QuestionService.prototype.readAllQuestions = function () {
        var _this = this;
        this.getQuestions().then(function (questions) {
            _this.questions = questions;
            _this._settingsService.saveQuestions(questions);
        });
    };
    QuestionService.prototype.readFromQuestions = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.questions[_this.getRandomNumber(_this.questions.length)]);
        });
    };
    QuestionService.prototype.getNextQuestionFromCache = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(QUESTIONS[_this.getRandomNumber(QUESTIONS.length)]);
        });
    };
    QuestionService.prototype.getQuestions = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var path = "questions";
            var onValueEvent = function (snapshot) {
                var results = _this.toQuestions(snapshot.value);
                resolve(results);
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        }).catch(this.handleErrors);
    };
    QuestionService.prototype.handleErrors = function (error) {
        console.log("error not handled: " + error.body);
        return null;
    };
    QuestionService.prototype.toQuestions = function (data) {
        var questions = [];
        data.forEach(function (raw) {
            questions.push(raw);
        });
        return questions;
    };
    return QuestionService;
}());
exports.QuestionService = QuestionService;
var QUESTIONS = [
    {
        description: "The following SAS program is submitted:\nfootnote 1 'Sales Report for Last Month';\nfootnote2 'Selected Products Only';\nfootnote3 'All Regions';\nfootnote4 'All Figures in Thousands of Dollars';\nproc print data = sasuser.shoes;\nfootnote2 'All Products';\nrun;\nWhich footnote(s) is/are displayed in the report?\n",
        options: [
            {
                tag: "A",
                description: "A. All Products",
                correct: false
            },
            {
                tag: "B",
                description: "B. Sales Report for Last Month All Products",
                correct: true
            },
            {
                tag: "C",
                description: "C. All Products All Regions All Figures in Thousands of Dollars",
                correct: false
            },
            {
                tag: "D",
                description: "D. Sales Report for Last Month All Products All Regions All Figures in Thousands of Dollars",
                correct: false
            }
        ]
    },
    {
        description: "Given the SAS data set EMPLOYEES:\nEMPLOYEES\nNAME SALARY\n-------- ------------\nInnis 60000\nJolli 50000\nEllis 55000\nLiu 45000\nThe following SAS program is submitted:\nproc print data = employees; where tag like '_i%';\nrun;\nWhat is contained in the output?\n",
        options: [
            {
                tag: "A",
                description: "A. Liu only",
                correct: true
            },
            {
                tag: "B",
                description: "B. Innis and Ellis only",
                correct: false
            },
            {
                tag: "C",
                description: "C. Innis, Ellis, and Liu only",
                correct: false
            },
            {
                tag: "D",
                description: "D. Innis, Jolli, Ellis, and Liu",
                correct: false
            }
        ]
    },
    {
        description: "The SAS data set SASUSER.HOUSES contains a variable PRICE which has been assigned a\npermanent label of \"Asking Price\". Which SAS program temporarily replaces the label \"Asking\nPrice\" with the label \"Sale Price\" in the output?\n",
        options: [
            {
                tag: "A",
                description: "A. proc print data =sasuser.houses; label price = \"Sale Price\"; run;",
                correct: false
            },
            {
                tag: "B",
                description: "B. proc print data =sasuser.houses label; label price \"Sale Price\"; run;",
                correct: false
            },
            {
                tag: "C",
                description: "C. proc print data =sasuser.houses label; label price = \"Sale Price\"; run;",
                correct: true
            },
            {
                tag: "D",
                description: "D. proc print data =sasuser.houses; price = \"Sale Price\"; run;",
                correct: false
            }
        ]
    },
    {
        description: "The following SAS program is submitted:\ndata work.empsalary;\nset work.people (in = inemp)\nwork.money(in = insal);\nif insal and inemp;\nrun;\nThe SAS data set WORKPEOPLE has 5 observations, and the data set WORKMONEY has 7\nobservations. How many observations will the data set WORK.EMPSALARY contain?\n",
        options: [
            {
                tag: "A",
                description: "A. 0",
                correct: true
            },
            {
                tag: "B",
                description: "B. 5",
                correct: false
            },
            {
                tag: "C",
                description: "C. 7",
                correct: false
            },
            {
                tag: "D",
                description: "D. 12",
                correct: false
            }
        ]
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSx1REFBbUQ7QUFFbkQsdURBQTBEO0FBQzFELG9DQUFzQztBQUN0QyxtRUFBK0Q7QUFFL0Q7SUFLSTtRQUhRLGNBQVMsR0FBcUIsRUFBRSxDQUFDO1FBSXJDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQseUNBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRU8seUNBQWUsR0FBdkIsVUFBd0IsR0FBVTtRQUM5QixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQsNkNBQW1CLEdBQW5CO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUEsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQyxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsRUFBRSxDQUFBLENBQUMsQ0FBQyxzQ0FBaUIsQ0FBQyxXQUFX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QUUsb1RBQW9UO1FBQ2pVLE9BQU8sRUFBRTtZQUNMO2dCQUNJLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNEO2dCQUNJLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNEO2dCQUNJLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNEO2dCQUNJLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFdBQVcsRUFBRSxPQUFPO2dCQUNwQixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKO0tBQ0o7Q0FDSixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgcmFrZXNoIG9uIDE1LU5vdi0yMDE3LlxyXG4gKi9cclxuaW1wb3J0IHtJUXVlc3Rpb259IGZyb20gXCIuLi9zaGFyZWQvcXVlc3Rpb25zLm1vZGVsXCI7XHJcbmltcG9ydCB7U2V0dGluZ3NTZXJ2aWNlfSBmcm9tIFwiLi9zZXR0aW5ncy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7Q29ubmVjdGlvblNlcnZpY2V9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdGlvbi5zZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uczogQXJyYXk8SVF1ZXN0aW9uPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfc2V0dGluZ3NTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2UgPSBuZXcgU2V0dGluZ3NTZXJ2aWNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TmV4dFF1ZXN0aW9uKCk6IFByb21pc2U8SVF1ZXN0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlyZWJhc2VRdWVzdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UmFuZG9tTnVtYmVyKG1heDpudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXgpKTtcclxuICAgICAgICByZXR1cm4gcmFuZG9tTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZpcmViYXNlUXVlc3Rpb24oKTogUHJvbWlzZTxJUXVlc3Rpb24+IHtcclxuICAgICAgICBpZiAodGhpcy5xdWVzdGlvbnMubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZEZyb21RdWVzdGlvbnMoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2V0dGluZ3NTZXJ2aWNlLmhhc1F1ZXN0aW9ucygpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zID0gdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnJlYWRRdWVzdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRGcm9tUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoIUNvbm5lY3Rpb25TZXJ2aWNlLmdldEluc3RhbmNlKCkuaXNDb25uZWN0ZWQoKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydChcIlBsZWFzZSBjb25uZWN0IHRvIGludGVybmV0IGp1c3Qgb25jZSBzbyB0aGF0IHdlIGNhbiBwcmVwYXJlIHF1YWxpdHkgcXVlc3Rpb25zIGZvciB5b3UhIVwiKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVhZEFsbFF1ZXN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE5leHRRdWVzdGlvbkZyb21DYWNoZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZEFsbFF1ZXN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdldFF1ZXN0aW9ucygpLnRoZW4oKHF1ZXN0aW9uczogQXJyYXk8SVF1ZXN0aW9uPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IHF1ZXN0aW9ucztcclxuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnNhdmVRdWVzdGlvbnMocXVlc3Rpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRGcm9tUXVlc3Rpb25zKCk6IFByb21pc2U8SVF1ZXN0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPElRdWVzdGlvbj4oKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnF1ZXN0aW9uc1t0aGlzLmdldFJhbmRvbU51bWJlcih0aGlzLnF1ZXN0aW9ucy5sZW5ndGgpXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXROZXh0UXVlc3Rpb25Gcm9tQ2FjaGUoKTogUHJvbWlzZTxJUXVlc3Rpb24+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8SVF1ZXN0aW9uPigocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgICAgICByZXNvbHZlKFFVRVNUSU9OU1t0aGlzLmdldFJhbmRvbU51bWJlcihRVUVTVElPTlMubGVuZ3RoKV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UXVlc3Rpb25zKCk6IFByb21pc2U8QXJyYXk8SVF1ZXN0aW9uPj4gIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8QXJyYXk8SVF1ZXN0aW9uPj4oKHJlc29sdmUsIHJlamVjdCk9PntcclxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IFwicXVlc3Rpb25zXCI7XHJcbiAgICAgICAgICAgIGNvbnN0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gdGhpcy50b1F1ZXN0aW9ucyhzbmFwc2hvdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIob25WYWx1ZUV2ZW50LCBgLyR7cGF0aH1gKTtcclxuICAgICAgICB9KS5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBub3QgaGFuZGxlZDogXCIgKyBlcnJvci5ib2R5KTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvUXVlc3Rpb25zKGRhdGE6IGFueSk6IEFycmF5PElRdWVzdGlvbj4ge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSBbXTtcclxuICAgICAgICBkYXRhLmZvckVhY2goKHJhdykgPT4ge1xyXG4gICAgICAgICAgICBxdWVzdGlvbnMucHVzaChyYXcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBxdWVzdGlvbnM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IFFVRVNUSU9OUzogQXJyYXk8SVF1ZXN0aW9uPiA9IFtcclxuICAgIHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgZm9sbG93aW5nIFNBUyBwcm9ncmFtIGlzIHN1Ym1pdHRlZDpcXG5mb290bm90ZSAxICdTYWxlcyBSZXBvcnQgZm9yIExhc3QgTW9udGgnO1xcbmZvb3Rub3RlMiAnU2VsZWN0ZWQgUHJvZHVjdHMgT25seSc7XFxuZm9vdG5vdGUzICdBbGwgUmVnaW9ucyc7XFxuZm9vdG5vdGU0ICdBbGwgRmlndXJlcyBpbiBUaG91c2FuZHMgb2YgRG9sbGFycyc7XFxucHJvYyBwcmludCBkYXRhID0gc2FzdXNlci5zaG9lcztcXG5mb290bm90ZTIgJ0FsbCBQcm9kdWN0cyc7XFxucnVuO1xcbldoaWNoIGZvb3Rub3RlKHMpIGlzL2FyZSBkaXNwbGF5ZWQgaW4gdGhlIHJlcG9ydD9cXG5cIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBLiBBbGwgUHJvZHVjdHNcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJCXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJCLiBTYWxlcyBSZXBvcnQgZm9yIExhc3QgTW9udGggQWxsIFByb2R1Y3RzXCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDLiBBbGwgUHJvZHVjdHMgQWxsIFJlZ2lvbnMgQWxsIEZpZ3VyZXMgaW4gVGhvdXNhbmRzIG9mIERvbGxhcnNcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJEXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJELiBTYWxlcyBSZXBvcnQgZm9yIExhc3QgTW9udGggQWxsIFByb2R1Y3RzIEFsbCBSZWdpb25zIEFsbCBGaWd1cmVzIGluIFRob3VzYW5kcyBvZiBEb2xsYXJzXCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJHaXZlbiB0aGUgU0FTIGRhdGEgc2V0IEVNUExPWUVFUzpcXG5FTVBMT1lFRVNcXG5OQU1FIFNBTEFSWVxcbi0tLS0tLS0tIC0tLS0tLS0tLS0tLVxcbklubmlzIDYwMDAwXFxuSm9sbGkgNTAwMDBcXG5FbGxpcyA1NTAwMFxcbkxpdSA0NTAwMFxcblRoZSBmb2xsb3dpbmcgU0FTIHByb2dyYW0gaXMgc3VibWl0dGVkOlxcbnByb2MgcHJpbnQgZGF0YSA9IGVtcGxveWVlczsgd2hlcmUgdGFnIGxpa2UgJ19pJSc7XFxucnVuO1xcbldoYXQgaXMgY29udGFpbmVkIGluIHRoZSBvdXRwdXQ/XFxuXCIsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQS4gTGl1IG9ubHlcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkJcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkIuIElubmlzIGFuZCBFbGxpcyBvbmx5XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQy4gSW5uaXMsIEVsbGlzLCBhbmQgTGl1IG9ubHlcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJEXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJELiBJbm5pcywgSm9sbGksIEVsbGlzLCBhbmQgTGl1XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgU0FTIGRhdGEgc2V0IFNBU1VTRVIuSE9VU0VTIGNvbnRhaW5zIGEgdmFyaWFibGUgUFJJQ0Ugd2hpY2ggaGFzIGJlZW4gYXNzaWduZWQgYVxcbnBlcm1hbmVudCBsYWJlbCBvZiBcXFwiQXNraW5nIFByaWNlXFxcIi4gV2hpY2ggU0FTIHByb2dyYW0gdGVtcG9yYXJpbHkgcmVwbGFjZXMgdGhlIGxhYmVsIFxcXCJBc2tpbmdcXG5QcmljZVxcXCIgd2l0aCB0aGUgbGFiZWwgXFxcIlNhbGUgUHJpY2VcXFwiIGluIHRoZSBvdXRwdXQ/XFxuXCIsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQS4gcHJvYyBwcmludCBkYXRhID1zYXN1c2VyLmhvdXNlczsgbGFiZWwgcHJpY2UgPSBcXFwiU2FsZSBQcmljZVxcXCI7IHJ1bjtcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJCXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJCLiBwcm9jIHByaW50IGRhdGEgPXNhc3VzZXIuaG91c2VzIGxhYmVsOyBsYWJlbCBwcmljZSBcXFwiU2FsZSBQcmljZVxcXCI7IHJ1bjtcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDLiBwcm9jIHByaW50IGRhdGEgPXNhc3VzZXIuaG91c2VzIGxhYmVsOyBsYWJlbCBwcmljZSA9IFxcXCJTYWxlIFByaWNlXFxcIjsgcnVuO1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiRFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRC4gcHJvYyBwcmludCBkYXRhID1zYXN1c2VyLmhvdXNlczsgcHJpY2UgPSBcXFwiU2FsZSBQcmljZVxcXCI7IHJ1bjtcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBmb2xsb3dpbmcgU0FTIHByb2dyYW0gaXMgc3VibWl0dGVkOlxcbmRhdGEgd29yay5lbXBzYWxhcnk7XFxuc2V0IHdvcmsucGVvcGxlIChpbiA9IGluZW1wKVxcbndvcmsubW9uZXkoaW4gPSBpbnNhbCk7XFxuaWYgaW5zYWwgYW5kIGluZW1wO1xcbnJ1bjtcXG5UaGUgU0FTIGRhdGEgc2V0IFdPUktQRU9QTEUgaGFzIDUgb2JzZXJ2YXRpb25zLCBhbmQgdGhlIGRhdGEgc2V0IFdPUktNT05FWSBoYXMgN1xcbm9ic2VydmF0aW9ucy4gSG93IG1hbnkgb2JzZXJ2YXRpb25zIHdpbGwgdGhlIGRhdGEgc2V0IFdPUksuRU1QU0FMQVJZIGNvbnRhaW4/XFxuXCIsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQS4gMFwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQlwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQi4gNVwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkNcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkMuIDdcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJEXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJELiAxMlwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXSJdfQ==