import { FlatList, ListRenderItemInfo, SafeAreaView } from 'react-native';
import { H2 } from '../assest/Typography';
import { useEffect, useState } from 'react';
import { ErrAlert, ErrMsg } from '../app/validation';
import { evaluateQuiz, getByPermalink } from '../API/ApiService';
import { Question, setResult } from '../features/quiz/quizSlice';
import QuestionCard from '../features/quiz/QuestionCard';
import Button from '../components/Button';
import { useAppDispatch } from '../app/hooks';
import { openNotification } from '../app/notification.ios';

const PlayQuiz = ({ navigation, route }: any) => {
  const permalink = route.params.permalink;
  const [title, setTitle] = useState(route.params.title);
  const [questions, setQuestions] = useState<Question[]>([]);
  const dispatch = useAppDispatch();

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

  const renderer = ({ item, index }: ListRenderItemInfo<Question>) => {
    return (
      <QuestionCard
        question={item}
        index={index}
        updateChosenOption={updateChosenOption}
      />
    );
  };
  const handleSubmit = () => {
    evaluateQuiz({ permalink, questions })
      .then(data => {
        dispatch(setResult(data));
        openNotification('Result', data.msg);
        navigation.navigate('Result', {
          params: {
            screen: 'Dashboard',
          },
        });
      })
      .catch(ErrAlert);
  };

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={item => item.title}
        data={questions}
        renderItem={renderer}
        ListHeaderComponent={<H2 style={{ padding: 20 }}>{title}</H2>}
        ListFooterComponent={
          <Button onPress={handleSubmit} title={'Submit'} color="primary" />
        }
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </SafeAreaView>
  );
};

export default PlayQuiz;
