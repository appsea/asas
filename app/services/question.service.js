"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_service_1 = require("./settings.service");
var firebase = require("nativescript-plugin-firebase");
var dialogs = require("ui/dialogs");
var connection_service_1 = require("../shared/connection.service");
var QuestionService = /** @class */ (function () {
    function QuestionService() {
        this.questions = [];
        this._settingsService = settings_service_1.SettingsService.getInstance();
        this._checked = false;
    }
    QuestionService.getInstance = function () {
        return QuestionService._instance;
    };
    QuestionService.prototype.getNextQuestion = function () {
        return this.getFirebaseQuestion();
    };
    QuestionService.prototype.getRandomNumber = function (max) {
        var randomNumber = Math.floor(Math.random() * (max));
        return randomNumber;
    };
    QuestionService.prototype.getFirebaseQuestion = function () {
        this.checkVersionUpdate();
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
    QuestionService.prototype.checkVersionUpdate = function () {
        var _this = this;
        if (!this._checked) {
            this.checkVersion().then(function (firebaseVersion) {
                if (_this._settingsService.readVersion() < firebaseVersion) {
                    _this.readAllQuestions();
                    _this._settingsService.saveVersion(firebaseVersion);
                    _this._checked = true;
                }
            });
        }
    };
    QuestionService.prototype.readFromQuestions = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var randomNumber = _this.getRandomNumber(_this.questions.length);
            resolve(_this.questions[randomNumber]);
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
    QuestionService.prototype.checkVersion = function () {
        return new Promise(function (resolve, reject) {
            var path = "version";
            var onValueEvent = function (snapshot) {
                var version = snapshot.value;
                resolve(version);
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        }).catch(this.handleErrors);
    };
    QuestionService.prototype.handleErrors = function (error) {
        console.log("error not handled: " + error.status + error.text());
        return null;
    };
    QuestionService.prototype.toQuestions = function (data) {
        var questions = [];
        data.forEach(function (raw) {
            questions.push(raw);
        });
        return questions;
    };
    QuestionService.prototype.update = function (question) {
        firebase.push('/suggestions', question);
    };
    QuestionService._instance = new QuestionService();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSx1REFBbUQ7QUFFbkQsdURBQTBEO0FBQzFELG9DQUFzQztBQUN0QyxtRUFBK0Q7QUFFL0Q7SUFZSTtRQUpRLGNBQVMsR0FBcUIsRUFBRSxDQUFDO1FBS3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFiTSwyQkFBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFhRCx5Q0FBZSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTyx5Q0FBZSxHQUF2QixVQUF3QixHQUFXO1FBQy9CLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCw2Q0FBbUIsR0FBbkI7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0Is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UixXQUFXLEVBQUUsOEVBQThFO2dCQUMzRixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNEO2dCQUNJLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFdBQVcsRUFBRSxrRUFBa0U7Z0JBQy9FLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0o7S0FDSjtJQUNEO1FBQ0ksV0FBVyxFQUFFLG9UQUFvVDtRQUNqVSxPQUFPLEVBQUU7WUFDTDtnQkFDSSxHQUFHLEVBQUUsR0FBRztnQkFDUixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRDtnQkFDSSxHQUFHLEVBQUUsR0FBRztnQkFDUixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRDtnQkFDSSxHQUFHLEVBQUUsR0FBRztnQkFDUixXQUFXLEVBQUUsTUFBTTtnQkFDbkIsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRDtnQkFDSSxHQUFHLEVBQUUsR0FBRztnQkFDUixXQUFXLEVBQUUsT0FBTztnQkFDcEIsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSjtLQUNKO0NBQ0osQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHJha2VzaCBvbiAxNS1Ob3YtMjAxNy5cclxuICovXHJcbmltcG9ydCB7SVF1ZXN0aW9ufSBmcm9tIFwiLi4vc2hhcmVkL3F1ZXN0aW9ucy5tb2RlbFwiO1xyXG5pbXBvcnQge1NldHRpbmdzU2VydmljZX0gZnJvbSBcIi4vc2V0dGluZ3Muc2VydmljZVwiO1xyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHtDb25uZWN0aW9uU2VydmljZX0gZnJvbSBcIi4uL3NoYXJlZC9jb25uZWN0aW9uLnNlcnZpY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblNlcnZpY2Uge1xyXG5cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBRdWVzdGlvblNlcnZpY2Uge1xyXG4gICAgICAgIHJldHVybiBRdWVzdGlvblNlcnZpY2UuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogUXVlc3Rpb25TZXJ2aWNlID0gbmV3IFF1ZXN0aW9uU2VydmljZSgpO1xyXG5cclxuICAgIHByaXZhdGUgcXVlc3Rpb25zOiBBcnJheTxJUXVlc3Rpb24+ID0gW107XHJcbiAgICBwcml2YXRlIF9zZXR0aW5nc1NlcnZpY2U6IFNldHRpbmdzU2VydmljZTtcclxuICAgIHByaXZhdGUgX2NoZWNrZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlID0gU2V0dGluZ3NTZXJ2aWNlLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgdGhpcy5fY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5leHRRdWVzdGlvbigpOiBQcm9taXNlPElRdWVzdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEZpcmViYXNlUXVlc3Rpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJhbmRvbU51bWJlcihtYXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCkpO1xyXG4gICAgICAgIHJldHVybiByYW5kb21OdW1iZXI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmlyZWJhc2VRdWVzdGlvbigpOiBQcm9taXNlPElRdWVzdGlvbj4ge1xyXG4gICAgICAgIHRoaXMuY2hlY2tWZXJzaW9uVXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25zLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRGcm9tUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzU2VydmljZS5oYXNRdWVzdGlvbnMoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnMgPSB0aGlzLl9zZXR0aW5nc1NlcnZpY2UucmVhZFF1ZXN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhZEZyb21RdWVzdGlvbnMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghQ29ubmVjdGlvblNlcnZpY2UuZ2V0SW5zdGFuY2UoKS5pc0Nvbm5lY3RlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydChcIlBsZWFzZSBjb25uZWN0IHRvIGludGVybmV0IGp1c3Qgb25jZSBzbyB0aGF0IHdlIGNhbiBwcmVwYXJlIHF1YWxpdHkgcXVlc3Rpb25zIGZvciB5b3UhIVwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFkQWxsUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmV4dFF1ZXN0aW9uRnJvbUNhY2hlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkQWxsUXVlc3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0UXVlc3Rpb25zKCkudGhlbigocXVlc3Rpb25zOiBBcnJheTxJUXVlc3Rpb24+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zID0gcXVlc3Rpb25zO1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2Uuc2F2ZVF1ZXN0aW9ucyhxdWVzdGlvbnMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tWZXJzaW9uVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fY2hlY2tlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrVmVyc2lvbigpLnRoZW4oKGZpcmViYXNlVmVyc2lvbjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnJlYWRWZXJzaW9uKCkgPCBmaXJlYmFzZVZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYWRBbGxRdWVzdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1NlcnZpY2Uuc2F2ZVZlcnNpb24oZmlyZWJhc2VWZXJzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZEZyb21RdWVzdGlvbnMoKTogUHJvbWlzZTxJUXVlc3Rpb24+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8SVF1ZXN0aW9uPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByYW5kb21OdW1iZXIgPSB0aGlzLmdldFJhbmRvbU51bWJlcih0aGlzLnF1ZXN0aW9ucy5sZW5ndGgpO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucXVlc3Rpb25zW3JhbmRvbU51bWJlcl0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TmV4dFF1ZXN0aW9uRnJvbUNhY2hlKCk6IFByb21pc2U8SVF1ZXN0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPElRdWVzdGlvbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKFFVRVNUSU9OU1t0aGlzLmdldFJhbmRvbU51bWJlcihRVUVTVElPTlMubGVuZ3RoKV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UXVlc3Rpb25zKCk6IFByb21pc2U8QXJyYXk8SVF1ZXN0aW9uPj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxBcnJheTxJUXVlc3Rpb24+PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBcInF1ZXN0aW9uc1wiO1xyXG4gICAgICAgICAgICBjb25zdCBvblZhbHVlRXZlbnQgPSAoc25hcHNob3Q6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IHRoaXMudG9RdWVzdGlvbnMoc25hcHNob3QudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XHJcbiAgICAgICAgfSkuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrVmVyc2lvbigpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXI+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IFwidmVyc2lvblwiO1xyXG4gICAgICAgICAgICBjb25zdCBvblZhbHVlRXZlbnQgPSAoc25hcHNob3Q6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmVyc2lvbjogbnVtYmVyID0gc25hcHNob3QudmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHZlcnNpb24pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIob25WYWx1ZUV2ZW50LCBgLyR7cGF0aH1gKTtcclxuICAgICAgICB9KS5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIG5vdCBoYW5kbGVkOiBcIiArIGVycm9yLnN0YXR1cyArIGVycm9yLnRleHQoKSk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0b1F1ZXN0aW9ucyhkYXRhOiBhbnkpOiBBcnJheTxJUXVlc3Rpb24+IHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gW107XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKChyYXcpID0+IHtcclxuICAgICAgICAgICAgcXVlc3Rpb25zLnB1c2gocmF3KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcXVlc3Rpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUocXVlc3Rpb246SVF1ZXN0aW9uKXtcclxuICAgICAgICBmaXJlYmFzZS5wdXNoKFxyXG4gICAgICAgICAgICAnL3N1Z2dlc3Rpb25zJyxcclxuICAgICAgICAgICAgcXVlc3Rpb25cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBRVUVTVElPTlM6IEFycmF5PElRdWVzdGlvbj4gPSBbXHJcbiAgICB7XHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIGZvbGxvd2luZyBTQVMgcHJvZ3JhbSBpcyBzdWJtaXR0ZWQ6XFxuZm9vdG5vdGUgMSAnU2FsZXMgUmVwb3J0IGZvciBMYXN0IE1vbnRoJztcXG5mb290bm90ZTIgJ1NlbGVjdGVkIFByb2R1Y3RzIE9ubHknO1xcbmZvb3Rub3RlMyAnQWxsIFJlZ2lvbnMnO1xcbmZvb3Rub3RlNCAnQWxsIEZpZ3VyZXMgaW4gVGhvdXNhbmRzIG9mIERvbGxhcnMnO1xcbnByb2MgcHJpbnQgZGF0YSA9IHNhc3VzZXIuc2hvZXM7XFxuZm9vdG5vdGUyICdBbGwgUHJvZHVjdHMnO1xcbnJ1bjtcXG5XaGljaCBmb290bm90ZShzKSBpcy9hcmUgZGlzcGxheWVkIGluIHRoZSByZXBvcnQ/XFxuXCIsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQS4gQWxsIFByb2R1Y3RzXCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQlwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQi4gU2FsZXMgUmVwb3J0IGZvciBMYXN0IE1vbnRoIEFsbCBQcm9kdWN0c1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQy4gQWxsIFByb2R1Y3RzIEFsbCBSZWdpb25zIEFsbCBGaWd1cmVzIGluIFRob3VzYW5kcyBvZiBEb2xsYXJzXCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiRFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRC4gU2FsZXMgUmVwb3J0IGZvciBMYXN0IE1vbnRoIEFsbCBQcm9kdWN0cyBBbGwgUmVnaW9ucyBBbGwgRmlndXJlcyBpbiBUaG91c2FuZHMgb2YgRG9sbGFyc1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiR2l2ZW4gdGhlIFNBUyBkYXRhIHNldCBFTVBMT1lFRVM6XFxuRU1QTE9ZRUVTXFxuTkFNRSBTQUxBUllcXG4tLS0tLS0tLSAtLS0tLS0tLS0tLS1cXG5Jbm5pcyA2MDAwMFxcbkpvbGxpIDUwMDAwXFxuRWxsaXMgNTUwMDBcXG5MaXUgNDUwMDBcXG5UaGUgZm9sbG93aW5nIFNBUyBwcm9ncmFtIGlzIHN1Ym1pdHRlZDpcXG5wcm9jIHByaW50IGRhdGEgPSBlbXBsb3llZXM7IHdoZXJlIHRhZyBsaWtlICdfaSUnO1xcbnJ1bjtcXG5XaGF0IGlzIGNvbnRhaW5lZCBpbiB0aGUgb3V0cHV0P1xcblwiLFxyXG4gICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkFcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkEuIExpdSBvbmx5XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJCXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJCLiBJbm5pcyBhbmQgRWxsaXMgb25seVwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkNcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkMuIElubmlzLCBFbGxpcywgYW5kIExpdSBvbmx5XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiRFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRC4gSW5uaXMsIEpvbGxpLCBFbGxpcywgYW5kIExpdVwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIFNBUyBkYXRhIHNldCBTQVNVU0VSLkhPVVNFUyBjb250YWlucyBhIHZhcmlhYmxlIFBSSUNFIHdoaWNoIGhhcyBiZWVuIGFzc2lnbmVkIGFcXG5wZXJtYW5lbnQgbGFiZWwgb2YgXFxcIkFza2luZyBQcmljZVxcXCIuIFdoaWNoIFNBUyBwcm9ncmFtIHRlbXBvcmFyaWx5IHJlcGxhY2VzIHRoZSBsYWJlbCBcXFwiQXNraW5nXFxuUHJpY2VcXFwiIHdpdGggdGhlIGxhYmVsIFxcXCJTYWxlIFByaWNlXFxcIiBpbiB0aGUgb3V0cHV0P1xcblwiLFxyXG4gICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkFcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkEuIHByb2MgcHJpbnQgZGF0YSA9c2FzdXNlci5ob3VzZXM7IGxhYmVsIHByaWNlID0gXFxcIlNhbGUgUHJpY2VcXFwiOyBydW47XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQlwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQi4gcHJvYyBwcmludCBkYXRhID1zYXN1c2VyLmhvdXNlcyBsYWJlbDsgbGFiZWwgcHJpY2UgXFxcIlNhbGUgUHJpY2VcXFwiOyBydW47XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQy4gcHJvYyBwcmludCBkYXRhID1zYXN1c2VyLmhvdXNlcyBsYWJlbDsgbGFiZWwgcHJpY2UgPSBcXFwiU2FsZSBQcmljZVxcXCI7IHJ1bjtcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkRcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkQuIHByb2MgcHJpbnQgZGF0YSA9c2FzdXNlci5ob3VzZXM7IHByaWNlID0gXFxcIlNhbGUgUHJpY2VcXFwiOyBydW47XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgZm9sbG93aW5nIFNBUyBwcm9ncmFtIGlzIHN1Ym1pdHRlZDpcXG5kYXRhIHdvcmsuZW1wc2FsYXJ5O1xcbnNldCB3b3JrLnBlb3BsZSAoaW4gPSBpbmVtcClcXG53b3JrLm1vbmV5KGluID0gaW5zYWwpO1xcbmlmIGluc2FsIGFuZCBpbmVtcDtcXG5ydW47XFxuVGhlIFNBUyBkYXRhIHNldCBXT1JLUEVPUExFIGhhcyA1IG9ic2VydmF0aW9ucywgYW5kIHRoZSBkYXRhIHNldCBXT1JLTU9ORVkgaGFzIDdcXG5vYnNlcnZhdGlvbnMuIEhvdyBtYW55IG9ic2VydmF0aW9ucyB3aWxsIHRoZSBkYXRhIHNldCBXT1JLLkVNUFNBTEFSWSBjb250YWluP1xcblwiLFxyXG4gICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkFcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkEuIDBcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkJcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkIuIDVcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDLiA3XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiRFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRC4gMTJcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbl0iXX0=