export interface IQuestionWrapper {
    question: IQuestion;
    selectedOption?: IOption;
    show?: boolean;
}

export interface IQuestion {
    number?: string;
    description: string;
    options: Array<IOption>;
    skipped?: boolean;
}

export interface IOptions {
    options: Array<IOption>;
}

export interface IOption {
    tag: string;
    description: string;
    correct: boolean;
    selected?: boolean;
    show?: boolean;
}

export interface ISetting {
    totalQuestionsShort: number;
    totalQuestionsMain: number;
}

export interface State {
    questionWrapper?: IQuestionWrapper;
    questions: Array<IQuestionWrapper>;
    questionNumber: number;
    totalQuestions: number;
}