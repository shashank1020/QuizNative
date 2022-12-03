import { Alert } from 'react-native';
import { Question } from '../features/quiz/quizSlice';
export const trim = (string: ((prevState: string) => string) | string) =>
  string.toString().replace(/ +/g, ' ');

export const ErrAlert = (e: {
  response: { data: { message: { toString: () => string } } };
}) =>
  Alert.alert('Error', e?.response?.data?.message.toString().replace('\\', ''));

export const ErrMsg = (e: string | undefined) => Alert.alert('Error', e);

export const validateEmail = (email: string) => {
  const validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  if (!validate) {
    Alert.alert('Please enter a correct email');
    return false;
  }
  return true;
};

export const validatePassword = (pass: string) => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(pass)) {
    Alert.alert('Password must not contain Whitespaces.');
    return false;
  }

  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(pass)) {
    Alert.alert('Password must have at least one Uppercase Character.');
    return false;
  }

  const isContainsLowercase = /^(?=.*[a-z]).*$/;
  if (!isContainsLowercase.test(pass)) {
    Alert.alert('Password must have at least one Lowercase Character.');
    return false;
  }

  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(pass)) {
    Alert.alert('Password must contain at least one Digit.');
    return false;
  }

  const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  if (!isContainsSymbol.test(pass)) {
    Alert.alert('Password must contain at least one Special Symbol.');
    return false;
  }

  const isValidLength = /^.{6,16}$/;
  if (!isValidLength.test(pass)) {
    Alert.alert('Password must be 10-16 Characters Long.');
    return false;
  }
  return true;
};

export const quizQuestionsValidator = (questions: Array<Question>) => {
  if (questions.length > 10) {
    Alert.alert('Questions cannot be more then 10');
  }
  return hasDuplicatesQuestions(questions);
};

export const hasDuplicatesQuestions = (quesArr: Array<Question>) => {
  const onlyQues = new Set(quesArr.map(q => q.title));
  if (onlyQues.size !== quesArr.length) {
    Alert.alert('Duplicate questions found');
    return false;
  }
  return true;
};

export const hasDuplicateOptions = (options: Array<String>) => {
  const filtered = new Set(options);
  if (filtered.size !== options.length) {
    Alert.alert('Duplicate options found');
    return false;
  }
  return true;
};
export const validateQuestion = (question: Question) => {
  if (
    question.options.length > 5 ||
    question.options.length < 2 ||
    // @ts-ignore
    question?.correctOptions?.length > question.options.length
  ) {
    Alert.alert('options should be between 2 to 5');
    return false;
  }
  // @ts-ignore
  if (question?.correctOptions?.length >= 1) {
    // @ts-ignore
    if (question.type === 'single' && question?.correctOptions.length !== 1) {
      Alert.alert('multiple correct option is given for single type question');
      return false;
    }
  } else {
    Alert.alert('correct options were not given');
    return false;
  }

  for (const optionIndex in question.options) {
    const optionValue = question.options[optionIndex];
    if (optionValue === '') {
      Alert.alert('Option cannot be empty');
      return false;
    }
  }
  for (const option in question.correctOptions) {
    // @ts-ignore
    if (!question.options.includes(question.correctOptions[option])) {
      Alert.alert('Correct option not in options');
      return false;
    }
  }
  return true;
};
