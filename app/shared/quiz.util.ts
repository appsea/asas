export class QuizUtil {

    private constructor(){}

    static getDate() {
        var d = new Date();
        return d.toISOString();
    }
}