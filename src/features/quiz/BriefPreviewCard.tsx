import { StyleSheet, View } from 'react-native';
import { Quiz } from './quizSlice';
import { H3, P1, PrimaryCTA } from '../../assest/Typography';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface BriefPreviewCardProps {
  quiz: Quiz;
  handlePlay: any;
}

const BriefPreviewCard = ({ quiz, handlePlay }: BriefPreviewCardProps) => {
  return (
    <View style={style.container}>
      <Card style={{ width: 350 }}>
        <H3 style={{ marginBottom: 30 }}>{quiz.title}</H3>
        <View style={style.info}>
          <P1>Total Question: {quiz.questionCount}</P1>
          <PrimaryCTA>#{quiz.permalink}</PrimaryCTA>
        </View>
        <Button onPress={handlePlay} title={'Play'} color={'primary'} />
      </Card>
    </View>
  );
};

export default BriefPreviewCard;

const style = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
