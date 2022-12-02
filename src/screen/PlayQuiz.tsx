import { FlatList, SafeAreaView, View } from 'react-native';
import { H2, Note, P1 } from '../assest/Typography';
import { useEffect, useState } from 'react';
import { ErrMsg } from '../app/validation';
import { evaluateQuiz, getByPermalink } from '../API/ApiService';
import { Question } from '../features/quiz/quizSlice';
import QuestionCard from '../features/quiz/QuestionCard';
import Button from '../components/Button';
import Card from '../components/Card';

interface Result {
  msg: string;
  scored: number;
  total: number;
  unanswered: number;
  wrong: number;
}

const PlayQuiz = ({ navigation, route }: any) => {
  const permalink = route.params.permalink;
  const [title, setTitle] = useState(route.params.title);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);
  useEffect(() => {
    if (permalink) {
      getByPermalink({ permalink })
        .then(data => {
          setTitle(data.title);
          setQuestions(data.questions);
        })
        .catch(e => ErrMsg(e));
    }
  }, [permalink]);

  const updateChosenOption = (
    questionIndex: number,
    value: string,
    add: any,
  ) => {
    const newQuestion = questions.map((ques, index) => {
      if (questionIndex === index) {
        const changedQues = ques;
        if (changedQues.type === 'single') {
          if (add) {
            changedQues.chosenOptions = [value];
          } else {
            changedQues.chosenOptions = [];
          }
        } else {
          if (add) {
            if (
              Array.isArray(changedQues.chosenOptions) &&
              changedQues.chosenOptions.length > 0
            ) {
              changedQues.chosenOptions.push(value);
            } else {
              changedQues.chosenOptions = [value];
            }
          } else {
            if (Array.isArray(changedQues.chosenOptions)) {
              const indexOfValue = changedQues.chosenOptions.indexOf(value);
              changedQues.chosenOptions.splice(indexOfValue, 1);
            } else {
              changedQues.chosenOptions = [];
            }
          }
        }
        return changedQues;
      }
      return ques;
    });
    setQuestions(newQuestion);
  };

  const renderer = (item: any) => {
    return (
      <QuestionCard
        question={item.item}
        index={item.index}
        updateChosenOption={updateChosenOption}
      />
    );
  };
  const handleSubmit = () => {
    evaluateQuiz({ permalink, questions }).then(data => {
      setResult(data);
    });
  };

  if (result !== undefined) {
    return (
      <View>
        <Card>
          <H2 textDecorationLine={'underline'}>Result</H2>
          <P1>{result.msg}</P1>
          <Note>Correct Answered: {result.scored}</Note>
          <Note>Wrong Answered: {result.wrong}</Note>
          <Note>Unanswered: {result.unanswered}</Note>
        </Card>
        <Button
          onPress={() => navigation.navigate('Dashboard')}
          title={'Back to Home'}
          color={'secondary'}
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={item => item.title}
        data={questions}
        renderItem={renderer}
        ListHeaderComponent={<H2 padding={20}>{title}</H2>}
        ListFooterComponent={
          <Button onPress={handleSubmit} title={'Submit'} color="primary" />
        }
      />
    </SafeAreaView>
  );
};

export default PlayQuiz;
