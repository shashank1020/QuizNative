import * as React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { H4 } from '../assest/Typography';
import { currentUser, Question } from '../features/quiz/quizSlice';
import TextInput from '../components/TextInput';
import { useCallback, useState } from 'react';
import Button from '../components/Button';
import QuestionAddEditCard from '../features/quiz/QuestionAddEditCard';
import { isNumber } from 'lodash';
import QuestionCard from '../features/quiz/QuestionCard';
import { createQuiz, getByPermalink, updateQuiz } from '../API/ApiService';
import {
  ErrAlert,
  quizQuestionsValidator,
  stringPreview,
  trim,
} from '../app/validation';
import { useAppSelector } from '../app/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { openNotification } from '../app/notification.ios';

const emptyCardValues: Question = {
  title: '',
  correctOptions: [],
  options: [],
  type: 'single',
};

const CreateQuiz = ({ navigation, route }: any) => {
  const permalink = route?.params?.permalink || '';
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([emptyCardValues]);
  const [editIndex, setEditIndex] = useState<null | number>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [shouldAddButtonDisabled, setShouldAddButtonDisabled] = useState(false);
  const User = useAppSelector(currentUser);

  const handleSaveQuiz = () => {
    if (trim(quizTitle) === '') {
      Alert.alert('Quiz title cannot be empty');
    } else if (quizQuestionsValidator(questions)) {
      if (route.name === 'Create' && User.token) {
        createQuiz({ title: quizTitle, questions }, User.token)
          .then(() => {
            openNotification(stringPreview(quizTitle), 'Quiz was saved');
            navigation.navigate('MyQuiz');
          })
          .catch(ErrAlert);
      } else {
        if (permalink && User.token) {
          updateQuiz(permalink, { title: quizTitle, questions }, User.token)
            .then(() => {
              openNotification(stringPreview(quizTitle), 'Quiz was updated');
              navigation.navigate('MyQuiz');
            })
            .catch(ErrAlert);
        }
      }
    }
  };

  const onQuestionUpdate = (newQues: Question) => {
    if (isNumber(editIndex)) {
      questions[editIndex] = newQues;
      setQuestions(questions);
    } else {
      setQuestions([newQues, ...questions]);
    }
    setShouldAddButtonDisabled(false);
    setEditIndex(null);
  };

  const deleteQuestion = (index: number) => {
    questions.splice(index, 1);
    setQuestions([...questions]);
    setShouldAddButtonDisabled(false);
  };

  const ButtonGroup = () => (
    <View>
      <Button
        onPress={() => {
          if (questions.length < 10) {
            setShouldAddButtonDisabled(true);
            setQuestions(prevState => [emptyCardValues, ...prevState]);
            setEditIndex(0);
          } else {
            Alert.alert('Max question made');
          }
        }}
        title={'Add Question'}
        color={'primary'}
        disabled={shouldAddButtonDisabled || questions.length === 10}
      />
      <Button
        onPress={handleSaveQuiz}
        title={'save This Quiz'}
        color={'secondary'}
        disabled={questions.length < 1}
      />
    </View>
  );

  const render = ({ item, index }: ListRenderItemInfo<Question>) => {
    return (
      <>
        {editIndex !== index ? (
          <QuestionCard
            question={item}
            index={index}
            deleteQuestion={deleteQuestion}
            isPublished={isPublished}
            setEdit={setEditIndex}
            isCreateScreen
          />
        ) : (
          <QuestionAddEditCard
            totalQues={questions.length}
            question={item}
            index={index}
            onQuestionUpdate={onQuestionUpdate}
            setEdit={setEditIndex}
            setAdd={setShouldAddButtonDisabled}
            deleteQuestion={deleteQuestion}
          />
        )}
        {questions.length - 1 === index && <ButtonGroup />}
      </>
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (route.name === 'Edit') {
        getByPermalink({ permalink }, User.token)
          .then(quiz => {
            setQuizTitle(quiz.title);
            setQuestions(quiz.questions);
            setIsPublished(quiz.published);
          })
          .catch(ErrAlert);
      } else {
        setQuestions([emptyCardValues]);
        setQuizTitle('');
        setIsPublished(false);
        setEditIndex(0);
        setShouldAddButtonDisabled(true);
      }
    }, [permalink, route.name, User.token]),
  );

  return (
    <SafeAreaView style={style.container}>
      <View style={style.rowView}>
        <H4>Quiz Name:</H4>
        <TextInput
          value={quizTitle}
          setValue={setQuizTitle}
          maxLength={30}
          placeholder="E.g: Javascript"
        />
      </View>
      {questions.length > 0 && (
        <FlatList
          style={{ width: 380 }}
          data={questions}
          renderItem={render}
          keyExtractor={item => item.title}
        />
      )}
    </SafeAreaView>
  );
};

export default CreateQuiz;

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 200,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rightHerderPosition: { position: 'absolute', top: 45, right: 10 },
});
