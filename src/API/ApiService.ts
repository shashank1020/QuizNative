import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoginProp {
  email: string;
  password: string;
}
interface SignupProp {
  email: string;
  password: string;
  name: string;
}

const BASEURL = 'http://localhost:3001';

const headerConfig = (jwt: string) => {
  return {
    headers: { jwt },
  };
};

export const loginUser = async ({ email, password }: LoginProp) => {
  return axios
    .post(`${BASEURL}/user/login`, { email, password })
    .then(response => response.data);

};


export const signUp = ({ name, email, password }: SignupProp) =>
  axios
    .post(`${BASEURL}/user/signup`, {
      name,
      email,
      password,
    })
    .then(response => response.data);

export const getAllQuiz = ({ page }: any, token?: any) =>
  axios
    .get(`${BASEURL}/quiz?page=${page}`, headerConfig(token))
    .then(response => response.data);

export const getByPermalink = ({ permalink }: any, token?: any) => {
  return axios
    .get(`${BASEURL}/quiz/${permalink}`, headerConfig(token))
    .then(response => response.data);
};

export const deleteQuiz = ({ id }: { id: string }, token: string) => {
  return axios
    .delete(`${BASEURL}/quiz/${id}`, headerConfig(token))
    .then(response => response.data);
};

export const updateQuiz = (
  permalink: string,
  { questions, title, published }: any,
  token: string,
) => {
  return axios
    .patch(
      `${BASEURL}/quiz/${permalink}`,
      {
        questions,
        title,
        published,
      },
      headerConfig(token),
    )
    .then(response => response.data);
};

export const createQuiz = (
  { title, questions, published }: any,
  token: string,
) => {
  return axios
    .post(
      `${BASEURL}/quiz`,
      {
        title,
        questions,
        published,
      },
      headerConfig(token),
    )
    .then(response => response.data);
};

export const evaluateQuiz = ({ permalink, questions }: any) => {
  return axios
    .post(`${BASEURL}/quiz/evaluate/${permalink}`, { questions })
    .then(response => response.data);
};
