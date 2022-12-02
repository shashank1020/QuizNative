import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Question {
  type: 'single' | 'multiple';
  title: string;
  options: string[];
  correctOptions?: string[];
  chosenOptions?: string[];
}

export interface Quiz {
  id: number;
  permalink: string;
  userId: number;
  title: string;
  published: boolean;
  questionCount: number;
  questions: Array<Question>;
}
interface User {
  token: string | undefined;
  name: string | undefined;
  email: string | undefined;
}
interface QuizState {
  currentUser: User;
  quiz: Quiz | {};
}

const initialState: QuizState = {
  currentUser: {
    token: '',
    name: '',
    email: '',
  },
  quiz: {},
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    doLogin: (state, { payload }) => {
      state.currentUser = payload;
    },
    doLogout: state => {
      state.quiz = {};
      state.currentUser = {
        token: '',
        name: '',
        email: '',
      };
    },
    setPublishedQuiz: (state, { payload }) => {
      state.quiz = payload;
    },
    setMyQuiz: (state, { payload }) => {
      state.quiz = payload;
    },
  },
});
export const { doLogin, doLogout, setPublishedQuiz } = quizSlice.actions;
export default quizSlice.reducer;
export const currentUser = (state: RootState) => state.quiz.currentUser;
export const publishedQuiz = (state: RootState) => state.quiz.quiz;
