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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSx1REFBbUQ7QUFFbkQsdURBQTBEO0FBQzFELG9DQUFzQztBQUN0QyxtRUFBK0Q7QUFFL0Q7SUFZSTtRQUpRLGNBQVMsR0FBcUIsRUFBRSxDQUFDO1FBS3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxrQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFiTSwyQkFBVyxHQUFsQjtRQUNJLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFhRCx5Q0FBZSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTyx5Q0FBZSxHQUF2QixVQUF3QixHQUFXO1FBQy9CLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCw2Q0FBbUIsR0FBbkI7UUFDSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0Is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S0FBSzthQUNqQjtTQUNKO0tBQ0o7SUFDRDtRQUNJLFdBQVcsRUFBRSxvVEFBb1Q7UUFDalUsT0FBTyxFQUFFO1lBQ0w7Z0JBQ0ksR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLE9BQU8sRUFBRSxJQUFJO2FBQ2hCO1lBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsV0FBVyxFQUFFLE9BQU87Z0JBQ3BCLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0o7S0FDSjtDQUNKLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSByYWtlc2ggb24gMTUtTm92LTIwMTcuXHJcbiAqL1xyXG5pbXBvcnQge0lRdWVzdGlvbn0gZnJvbSBcIi4uL3NoYXJlZC9xdWVzdGlvbnMubW9kZWxcIjtcclxuaW1wb3J0IHtTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuL3NldHRpbmdzLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7Q29ubmVjdGlvblNlcnZpY2V9IGZyb20gXCIuLi9zaGFyZWQvY29ubmVjdGlvbi5zZXJ2aWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TZXJ2aWNlIHtcclxuXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUXVlc3Rpb25TZXJ2aWNlIHtcclxuICAgICAgICByZXR1cm4gUXVlc3Rpb25TZXJ2aWNlLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IFF1ZXN0aW9uU2VydmljZSA9IG5ldyBRdWVzdGlvblNlcnZpY2UoKTtcclxuXHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uczogQXJyYXk8SVF1ZXN0aW9uPiA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfc2V0dGluZ3NTZXJ2aWNlOiBTZXR0aW5nc1NlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9jaGVja2VkOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzU2VydmljZSA9IFNldHRpbmdzU2VydmljZS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMuX2NoZWNrZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXROZXh0UXVlc3Rpb24oKTogUHJvbWlzZTxJUXVlc3Rpb24+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaXJlYmFzZVF1ZXN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSYW5kb21OdW1iZXIobWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXgpKTtcclxuICAgICAgICByZXR1cm4gcmFuZG9tTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZpcmViYXNlUXVlc3Rpb24oKTogUHJvbWlzZTxJUXVlc3Rpb24+IHtcclxuICAgICAgICB0aGlzLmNoZWNrVmVyc2lvblVwZGF0ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXN0aW9ucy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkRnJvbVF1ZXN0aW9ucygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXR0aW5nc1NlcnZpY2UuaGFzUXVlc3Rpb25zKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zID0gdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnJlYWRRdWVzdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRGcm9tUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIUNvbm5lY3Rpb25TZXJ2aWNlLmdldEluc3RhbmNlKCkuaXNDb25uZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoXCJQbGVhc2UgY29ubmVjdCB0byBpbnRlcm5ldCBqdXN0IG9uY2Ugc28gdGhhdCB3ZSBjYW4gcHJlcGFyZSBxdWFsaXR5IHF1ZXN0aW9ucyBmb3IgeW91ISFcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVhZEFsbFF1ZXN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE5leHRRdWVzdGlvbkZyb21DYWNoZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVhZEFsbFF1ZXN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmdldFF1ZXN0aW9ucygpLnRoZW4oKHF1ZXN0aW9uczogQXJyYXk8SVF1ZXN0aW9uPikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9ucyA9IHF1ZXN0aW9ucztcclxuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnNhdmVRdWVzdGlvbnMocXVlc3Rpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoZWNrVmVyc2lvblVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NoZWNrZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1ZlcnNpb24oKS50aGVuKChmaXJlYmFzZVZlcnNpb246IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzU2VydmljZS5yZWFkVmVyc2lvbigpIDwgZmlyZWJhc2VWZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFkQWxsUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NTZXJ2aWNlLnNhdmVWZXJzaW9uKGZpcmViYXNlVmVyc2lvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlYWRGcm9tUXVlc3Rpb25zKCk6IFByb21pc2U8SVF1ZXN0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPElRdWVzdGlvbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmFuZG9tTnVtYmVyID0gdGhpcy5nZXRSYW5kb21OdW1iZXIodGhpcy5xdWVzdGlvbnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnF1ZXN0aW9uc1tyYW5kb21OdW1iZXJdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldE5leHRRdWVzdGlvbkZyb21DYWNoZSgpOiBQcm9taXNlPElRdWVzdGlvbj4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxJUXVlc3Rpb24+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShRVUVTVElPTlNbdGhpcy5nZXRSYW5kb21OdW1iZXIoUVVFU1RJT05TLmxlbmd0aCldKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFF1ZXN0aW9ucygpOiBQcm9taXNlPEFycmF5PElRdWVzdGlvbj4+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8QXJyYXk8SVF1ZXN0aW9uPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXRoID0gXCJxdWVzdGlvbnNcIjtcclxuICAgICAgICAgICAgY29uc3Qgb25WYWx1ZUV2ZW50ID0gKHNuYXBzaG90OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSB0aGlzLnRvUXVlc3Rpb25zKHNuYXBzaG90LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvblZhbHVlRXZlbnQsIGAvJHtwYXRofWApO1xyXG4gICAgICAgIH0pLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja1ZlcnNpb24oKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBcInZlcnNpb25cIjtcclxuICAgICAgICAgICAgY29uc3Qgb25WYWx1ZUV2ZW50ID0gKHNuYXBzaG90OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZlcnNpb246IG51bWJlciA9IHNuYXBzaG90LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh2ZXJzaW9uKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XHJcbiAgICAgICAgfSkuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBub3QgaGFuZGxlZDogXCIgKyBlcnJvci5ib2R5KTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvUXVlc3Rpb25zKGRhdGE6IGFueSk6IEFycmF5PElRdWVzdGlvbj4ge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSBbXTtcclxuICAgICAgICBkYXRhLmZvckVhY2goKHJhdykgPT4ge1xyXG4gICAgICAgICAgICBxdWVzdGlvbnMucHVzaChyYXcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBxdWVzdGlvbnM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IFFVRVNUSU9OUzogQXJyYXk8SVF1ZXN0aW9uPiA9IFtcclxuICAgIHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgZm9sbG93aW5nIFNBUyBwcm9ncmFtIGlzIHN1Ym1pdHRlZDpcXG5mb290bm90ZSAxICdTYWxlcyBSZXBvcnQgZm9yIExhc3QgTW9udGgnO1xcbmZvb3Rub3RlMiAnU2VsZWN0ZWQgUHJvZHVjdHMgT25seSc7XFxuZm9vdG5vdGUzICdBbGwgUmVnaW9ucyc7XFxuZm9vdG5vdGU0ICdBbGwgRmlndXJlcyBpbiBUaG91c2FuZHMgb2YgRG9sbGFycyc7XFxucHJvYyBwcmludCBkYXRhID0gc2FzdXNlci5zaG9lcztcXG5mb290bm90ZTIgJ0FsbCBQcm9kdWN0cyc7XFxucnVuO1xcbldoaWNoIGZvb3Rub3RlKHMpIGlzL2FyZSBkaXNwbGF5ZWQgaW4gdGhlIHJlcG9ydD9cXG5cIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBLiBBbGwgUHJvZHVjdHNcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJCXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJCLiBTYWxlcyBSZXBvcnQgZm9yIExhc3QgTW9udGggQWxsIFByb2R1Y3RzXCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDLiBBbGwgUHJvZHVjdHMgQWxsIFJlZ2lvbnMgQWxsIEZpZ3VyZXMgaW4gVGhvdXNhbmRzIG9mIERvbGxhcnNcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJEXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJELiBTYWxlcyBSZXBvcnQgZm9yIExhc3QgTW9udGggQWxsIFByb2R1Y3RzIEFsbCBSZWdpb25zIEFsbCBGaWd1cmVzIGluIFRob3VzYW5kcyBvZiBEb2xsYXJzXCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJHaXZlbiB0aGUgU0FTIGRhdGEgc2V0IEVNUExPWUVFUzpcXG5FTVBMT1lFRVNcXG5OQU1FIFNBTEFSWVxcbi0tLS0tLS0tIC0tLS0tLS0tLS0tLVxcbklubmlzIDYwMDAwXFxuSm9sbGkgNTAwMDBcXG5FbGxpcyA1NTAwMFxcbkxpdSA0NTAwMFxcblRoZSBmb2xsb3dpbmcgU0FTIHByb2dyYW0gaXMgc3VibWl0dGVkOlxcbnByb2MgcHJpbnQgZGF0YSA9IGVtcGxveWVlczsgd2hlcmUgdGFnIGxpa2UgJ19pJSc7XFxucnVuO1xcbldoYXQgaXMgY29udGFpbmVkIGluIHRoZSBvdXRwdXQ/XFxuXCIsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQS4gTGl1IG9ubHlcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkJcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkIuIElubmlzIGFuZCBFbGxpcyBvbmx5XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQ1wiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQy4gSW5uaXMsIEVsbGlzLCBhbmQgTGl1IG9ubHlcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJEXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJELiBJbm5pcywgSm9sbGksIEVsbGlzLCBhbmQgTGl1XCIsXHJcbiAgICAgICAgICAgICAgICBjb3JyZWN0OiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGUgU0FTIGRhdGEgc2V0IFNBU1VTRVIuSE9VU0VTIGNvbnRhaW5zIGEgdmFyaWFibGUgUFJJQ0Ugd2hpY2ggaGFzIGJlZW4gYXNzaWduZWQgYVxcbnBlcm1hbmVudCBsYWJlbCBvZiBcXFwiQXNraW5nIFByaWNlXFxcIi4gV2hpY2ggU0FTIHByb2dyYW0gdGVtcG9yYXJpbHkgcmVwbGFjZXMgdGhlIGxhYmVsIFxcXCJBc2tpbmdcXG5QcmljZVxcXCIgd2l0aCB0aGUgbGFiZWwgXFxcIlNhbGUgUHJpY2VcXFwiIGluIHRoZSBvdXRwdXQ/XFxuXCIsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQS4gcHJvYyBwcmludCBkYXRhID1zYXN1c2VyLmhvdXNlczsgbGFiZWwgcHJpY2UgPSBcXFwiU2FsZSBQcmljZVxcXCI7IHJ1bjtcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJCXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJCLiBwcm9jIHByaW50IGRhdGEgPXNhc3VzZXIuaG91c2VzIGxhYmVsOyBsYWJlbCBwcmljZSBcXFwiU2FsZSBQcmljZVxcXCI7IHJ1bjtcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJDXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDLiBwcm9jIHByaW50IGRhdGEgPXNhc3VzZXIuaG91c2VzIGxhYmVsOyBsYWJlbCBwcmljZSA9IFxcXCJTYWxlIFByaWNlXFxcIjsgcnVuO1wiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiRFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRC4gcHJvYyBwcmludCBkYXRhID1zYXN1c2VyLmhvdXNlczsgcHJpY2UgPSBcXFwiU2FsZSBQcmljZVxcXCI7IHJ1bjtcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBmb2xsb3dpbmcgU0FTIHByb2dyYW0gaXMgc3VibWl0dGVkOlxcbmRhdGEgd29yay5lbXBzYWxhcnk7XFxuc2V0IHdvcmsucGVvcGxlIChpbiA9IGluZW1wKVxcbndvcmsubW9uZXkoaW4gPSBpbnNhbCk7XFxuaWYgaW5zYWwgYW5kIGluZW1wO1xcbnJ1bjtcXG5UaGUgU0FTIGRhdGEgc2V0IFdPUktQRU9QTEUgaGFzIDUgb2JzZXJ2YXRpb25zLCBhbmQgdGhlIGRhdGEgc2V0IFdPUktNT05FWSBoYXMgN1xcbm9ic2VydmF0aW9ucy4gSG93IG1hbnkgb2JzZXJ2YXRpb25zIHdpbGwgdGhlIGRhdGEgc2V0IFdPUksuRU1QU0FMQVJZIGNvbnRhaW4/XFxuXCIsXHJcbiAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQS4gMFwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwiQlwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQi4gNVwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcIkNcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkMuIDdcIixcclxuICAgICAgICAgICAgICAgIGNvcnJlY3Q6IGZhbHNlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJEXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJELiAxMlwiLFxyXG4gICAgICAgICAgICAgICAgY29ycmVjdDogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuXSJdfQ==