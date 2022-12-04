import * as React from 'react';
import Card from '../components/Card';
import { H2, Note, P1 } from '../assest/Typography';
import Button from '../components/Button';
import { View } from 'react-native';
import { useAppSelector } from '../app/hooks';
import { Result, result } from '../features/quiz/quizSlice';

const Results = ({ navigation }: any) => {
  const _result: Result = useAppSelector(result);
  return (
    <View>
      {JSON.stringify(_result) !== '{}' && (
        <Card>
          <H2 textDecorationLine={'underline'}>Result</H2>
          <P1>{_result.msg ?? 'df'}</P1>
          <Note>Correct Answered: {_result.scored}</Note>
          <Note>Wrong Answered: {_result.wrong}</Note>
          <Note>Unanswered: {_result.unanswered}</Note>
        </Card>
      )}
      <Button
        onPress={() => navigation.navigate('Dashboard')}
        title={'Back to Home'}
        color={'secondary'}
      />
    </View>
  );
};

export default Results;
