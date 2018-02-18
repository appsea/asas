import {EventData, Observable} from "data/observable";
import {SettingsService} from "../services/settings.service";

export class ProgressViewModel extends Observable {

    constructor() {
        super();
    }

    get categoricalSource() {
        return [
            { Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24 },
            { Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25 },
            { Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23 },
            { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24 },
            { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21 }
        ]
    }

    get getLastFiveTimer(){
        return this.getLastFive(SettingsService.TICK);
    }

    get getLastFiveMain() {
        return this.getLastFive(SettingsService.MAIN);
    }


    get getLastFiveQuick() {
        return this.getLastFive(SettingsService.QUICK);
    }


    getLastFive(mode:string) {
        let scores:Array<number> = SettingsService.getInstance().getScore(mode);
        let result = [
            { Attempt: "Latest", Percentage: 0},
            { Attempt: "Second", Percentage: 0},
            { Attempt: "Third", Percentage: 0},
            { Attempt: "Fourth", Percentage: 0},
            { Attempt: "Oldest", Percentage: 0}
        ];
        var j = 0;
        for (var i = scores.length; i-- > 0;){
            let record = result[j++];
            record.Percentage = scores[i].valueOf();
        }
        return result;
    }

}