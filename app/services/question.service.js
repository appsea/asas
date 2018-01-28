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
            console.log("Inside Promise..");
            var path = "questions";
            var onValueEvent = function (snapshot) {
                console.log("Got Snapshot..");
                var results = _this.toQuestions(snapshot.value);
                console.log("Got Questions..." + results.length);
                //observer.next(results);
                resolve(results);
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        }).catch(this.handleErrors);
    };
    QuestionService.prototype.handleErrors = function (error) {
        console.log("Got error: " + error.body);
        return null;
    };
    QuestionService.prototype.toQuestions = function (data) {
        console.log("To Questions...");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSx1REFBbUQ7QUFFbkQsdURBQTBEO0FBQzFELG9DQUFzQztBQUN0QyxtRUFBK0Q7QUFFL0Q7SUFLSTtRQUhRLGNBQVMsR0FBcUIsRUFBRSxDQUFDO1FBSXJDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQseUNBQWUsR0FBZjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRU8seUNBQWUsR0FBdkIsVUFBd0IsR0FBVTtRQUM5QixJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQsNkNBQW1CLEdBQW5CO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDcEMsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0YsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUEsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQyxDQUFDO1lBQUEsSUFBSSxDQUFBLENBQUM7Z0JBQ0YsRUFBRSxDQUFBLENBQUMsQ0FBQyxzQ0FBaUIsQ0FBQyxXQUFX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Q3pGLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsV0FBVyxFQUFFLDhFQUE4RTtnQkFDM0YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRDtnQkFDSSxHQUFHLEVBQUUsR0FBRztnQkFDUixXQUFXLEVBQUUsa0VBQWtFO2dCQUMvRSxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKO0tBQ0o7SUFDRDtRQUNJLFdBQVcsRUFBRSxvVEFBb1Q7UUFDalUsT0FBTyxFQUFFO1lBQ0w7Z0JBQ0ksR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0o7S0FDSjtDQUNKLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSByYWtlc2ggb24gMTUtTm92LTIwMTcuXHJcbiAqL1xyXG5pbXBvcnQge0lRdWVzdGlvbn0gZnJvbSBcIi4uL3NoYXJlZC9xdWVzdGlvbnMubW9kZWxcIjtcclxuaW1wb3J0IHtTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuL3NldHRpbmdzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHtDb25uZWN0aW9uU2VydmljZX0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0aW9uLnNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgcXVlc3Rpb25zOiBBcnJheTxJUXVlc3Rpb24+ID0gW107XHJcbiAgICBwcml2YXRlIF9zZXR0aW5nc1NlcnZpY2U6IFNldHRpbmdzU2VydmljZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZSA9IG5ldyBTZXR0aW5nc1NlcnZpY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROZXh0UXVlc3Rpb24oKTogUHJvbWlzZTxJUXVlc3Rpb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaXJlYmFzZVF1ZXN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21OdW1iZXIobWF4Om51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCkpO1xyXG4gICAgICAgIHJldHVybiByYW5kb21OdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmlyZWJhc2VRdWVzdGlvbigpOiBQcm9taXNlPElRdWVzdGlvbj4ge1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXN0aW9ucy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkRnJvbVF1ZXN0aW9ucygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpZih0aGlzLl9zZXR0aW5nc1NlcnZpY2UuaGFzUXVlc3Rpb25zKCkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnMgPSB0aGlzLl9zZXR0aW5nc1NlcnZpY2UucmVhZFF1ZXN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZEZyb21RdWVzdGlvbnMoKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZighQ29ubmVjdGlvblNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5pc0Nvbm5lY3RlZCgpKXtcclxuICAgICAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KFwiUGxlYXNlIGNvbm5lY3QgdG8gaW50ZXJuZXQganVzdCBvbmNlIHNvIHRoYXQgd2UgY2FuIHByZXBhcmUgcXVhbGl0eSBxdWVzdGlvbnMgZm9yIHlvdSEhXCIpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFkQWxsUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmV4dFF1ZXN0aW9uRnJvbUNhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkQWxsUXVlc3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0UXVlc3Rpb25zKCkudGhlbigocXVlc3Rpb25zOiBBcnJheTxJUXVlc3Rpb24+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zID0gcXVlc3Rpb25zO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2Uuc2F2ZVF1ZXN0aW9ucyhxdWVzdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZEZyb21RdWVzdGlvbnMoKTogUHJvbWlzZTxJUXVlc3Rpb24+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8SVF1ZXN0aW9uPigocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucXVlc3Rpb25zW3RoaXMuZ2V0UmFuZG9tTnVtYmVyKHRoaXMucXVlc3Rpb25zLmxlbmd0aCldKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5leHRRdWVzdGlvbkZyb21DYWNoZSgpOiBQcm9taXNlPElRdWVzdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJUXVlc3Rpb24+KChyZXNvbHZlLCByZWplY3QpPT57XHJcbiAgICAgICAgICAgIHJlc29sdmUoUVVFU1RJT05TW3RoaXMuZ2V0UmFuZG9tTnVtYmVyKFFVRVNUSU9OUy5sZW5ndGgpXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRRdWVzdGlvbnMoKTogUHJvbWlzZTxBcnJheTxJUXVlc3Rpb24+PiAge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxBcnJheTxJUXVlc3Rpb24+PigocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluc2lkZSBQcm9taXNlLi5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBcInF1ZXN0aW9uc1wiO1xyXG4gICAgICAgICAgICBjb25zdCBvblZhbHVlRXZlbnQgPSAoc25hcHNob3Q6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHb3QgU25hcHNob3QuLlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSB0aGlzLnRvUXVlc3Rpb25zKHNuYXBzaG90LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR290IFF1ZXN0aW9ucy4uLlwiICsgcmVzdWx0cy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgLy9vYnNlcnZlci5uZXh0KHJlc3VsdHMpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XHJcbiAgICAgICAgfSkuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiR290IGVycm9yOiBcIiArIGVycm9yLmJvZHkpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9RdWVzdGlvbnMoZGF0YTogYW55KTogQXJyYXk8SVF1ZXN0aW9uPiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJUbyBRdWVzdGlvbnMuLi5cIik7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IFtdO1xyXG4gICAgICAgIGRhdGEuZm9yRWFjaCgocmF3KSA9PiB7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHJhdyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9ucztcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgUVVFU1RJT05TOiBBcnJheTxJUXVlc3Rpb24+ID0gW1xyXG4gICAge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBmb2xsb3dpbmcgU0FTIHByb2dyYW0gaXMgc3VibWl0dGVkOlxcbmZvb3Rub3RlIDEgJ1NhbGVzIFJlcG9ydCBmb3IgTGFzdCBNb250aCc7XFxuZm9vdG5vdGUyICdTZWxlY3RlZCBQcm9kdWN0cyBPbmx5JztcXG5mb290bm90ZTMgJ0FsbCBSZWdpb25zJztcXG5mb290bm90ZTQgJ0FsbCBGaWd1cmVzIGluIFRob3VzYW5kcyBvZiBEb2xsYXJzJztcXG5wcm9jIHByaW50IGRhdGEgPSBzYXN1c2VyLnNob2VzO1xcbmZvb3Rub3RlMiAnQWxsIFByb2R1Y3RzJztcXG5ydW47XFxuV2hpY2ggZm9vdG5vdGUocykgaXMvYXJlIGRpc3BsYXllZCBpbiB0aGUgcmVwb3J0P1xcblwiLFxyXG4gICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkFcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkEuIEFsbCBQcm9kdWN0c1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkJcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkIuIFNhbGVzIFJlcG9ydCBmb3IgTGFzdCBNb250aCBBbGwgUHJvZHVjdHNcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkNcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkMuIEFsbCBQcm9kdWN0cyBBbGwgUmVnaW9ucyBBbGwgRmlndXJlcyBpbiBUaG91c2FuZHMgb2YgRG9sbGFyc1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkRcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkQuIFNhbGVzIFJlcG9ydCBmb3IgTGFzdCBNb250aCBBbGwgUHJvZHVjdHMgQWxsIFJlZ2lvbnMgQWxsIEZpZ3VyZXMgaW4gVGhvdXNhbmRzIG9mIERvbGxhcnNcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkdpdmVuIHRoZSBTQVMgZGF0YSBzZXQgRU1QTE9ZRUVTOlxcbkVNUExPWUVFU1xcbk5BTUUgU0FMQVJZXFxuLS0tLS0tLS0gLS0tLS0tLS0tLS0tXFxuSW5uaXMgNjAwMDBcXG5Kb2xsaSA1MDAwMFxcbkVsbGlzIDU1MDAwXFxuTGl1IDQ1MDAwXFxuVGhlIGZvbGxvd2luZyBTQVMgcHJvZ3JhbSBpcyBzdWJtaXR0ZWQ6XFxucHJvYyBwcmludCBkYXRhID0gZW1wbG95ZWVzOyB3aGVyZSB0YWcgbGlrZSAnX2klJztcXG5ydW47XFxuV2hhdCBpcyBjb250YWluZWQgaW4gdGhlIG91dHB1dD9cXG5cIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBLiBMaXUgb25seVwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQlwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQi4gSW5uaXMgYW5kIEVsbGlzIG9ubHlcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDLiBJbm5pcywgRWxsaXMsIGFuZCBMaXUgb25seVwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkRcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkQuIElubmlzLCBKb2xsaSwgRWxsaXMsIGFuZCBMaXVcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBTQVMgZGF0YSBzZXQgU0FTVVNFUi5IT1VTRVMgY29udGFpbnMgYSB2YXJpYWJsZSBQUklDRSB3aGljaCBoYXMgYmVlbiBhc3NpZ25lZCBhXFxucGVybWFuZW50IGxhYmVsIG9mIFxcXCJBc2tpbmcgUHJpY2VcXFwiLiBXaGljaCBTQVMgcHJvZ3JhbSB0ZW1wb3JhcmlseSByZXBsYWNlcyB0aGUgbGFiZWwgXFxcIkFza2luZ1xcblByaWNlXFxcIiB3aXRoIHRoZSBsYWJlbCBcXFwiU2FsZSBQcmljZVxcXCIgaW4gdGhlIG91dHB1dD9cXG5cIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBLiBwcm9jIHByaW50IGRhdGEgPXNhc3VzZXIuaG91c2VzOyBsYWJlbCBwcmljZSA9IFxcXCJTYWxlIFByaWNlXFxcIjsgcnVuO1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkJcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkIuIHByb2MgcHJpbnQgZGF0YSA9c2FzdXNlci5ob3VzZXMgbGFiZWw7IGxhYmVsIHByaWNlIFxcXCJTYWxlIFByaWNlXFxcIjsgcnVuO1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkNcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkMuIHByb2MgcHJpbnQgZGF0YSA9c2FzdXNlci5ob3VzZXMgbGFiZWw7IGxhYmVsIHByaWNlID0gXFxcIlNhbGUgUHJpY2VcXFwiOyBydW47XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJEXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJELiBwcm9jIHByaW50IGRhdGEgPXNhc3VzZXIuaG91c2VzOyBwcmljZSA9IFxcXCJTYWxlIFByaWNlXFxcIjsgcnVuO1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIGZvbGxvd2luZyBTQVMgcHJvZ3JhbSBpcyBzdWJtaXR0ZWQ6XFxuZGF0YSB3b3JrLmVtcHNhbGFyeTtcXG5zZXQgd29yay5wZW9wbGUgKGluID0gaW5lbXApXFxud29yay5tb25leShpbiA9IGluc2FsKTtcXG5pZiBpbnNhbCBhbmQgaW5lbXA7XFxucnVuO1xcblRoZSBTQVMgZGF0YSBzZXQgV09SS1BFT1BMRSBoYXMgNSBvYnNlcnZhdGlvbnMsIGFuZCB0aGUgZGF0YSBzZXQgV09SS01PTkVZIGhhcyA3XFxub2JzZXJ2YXRpb25zLiBIb3cgbWFueSBvYnNlcnZhdGlvbnMgd2lsbCB0aGUgZGF0YSBzZXQgV09SSy5FTVBTQUxBUlkgY29udGFpbj9cXG5cIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBLiAwXCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJCXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJCLiA1XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQy4gN1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkRcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkQuIDEyXCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5dIl19