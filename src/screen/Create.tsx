import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { H2, H4 } from '../assest/Typography';
import { Question } from '../features/quiz/quizSlice';
import CTextInput from '../components/TextInput';
import { useState } from 'react';
import Button from '../components/Button';
import QuestionAddEditCard from '../features/quiz/QuestionAddEditCard';
import { isNumber } from 'lodash';

const emptyCardValues: Question = {
  title: '',
  correctOptions: [],
  options: [],
  type: 'single',
};

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([emptyCardValues]);
  const [editIndex, setEditIndex] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [add, setAdd] = useState(false);
  const handleAdd = () =>
    setQuestions(prevState => [emptyCardValues, ...prevState]);

  const onQuestionUpdate = (newQues: Question) => {
    if (isNumber(editIndex)) {
      questions[editIndex] = newQues;
      setQuestions(questions);
    } else {
      setQuestions([newQues, ...questions]);
    }
    setAdd(false);
    setEditIndex(null);
  };

  const render = ({ item, index }: ListRenderItemInfo<Question>) => {
    return (
      <QuestionAddEditCard
        question={item}
        index={index}
        onQuestionUpdate={onQuestionUpdate}
      />
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <H2>Create</H2>
      <View style={style.rowView}>
        <H4>Quiz Name:</H4>
        <CTextInput
          value={quizTitle}
          setValue={setQuizTitle}
          maxLength={30}
          placeholder="E.g: Javascript"
        />
      </View>
      {questions.length > 0 && (
        <FlatList
          data={questions}
          renderItem={render}
          keyExtractor={item => item.title}
          ListFooterComponent={
            <Button
              onPress={handleAdd}
              title={'Add Question'}
              color={'primary'}
            />
          }
          ListFooterComponentStyle={{ alignItems: 'center' }}
        />
      )}
    </SafeAreaView>
  );
};

export default CreateQuiz;

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
