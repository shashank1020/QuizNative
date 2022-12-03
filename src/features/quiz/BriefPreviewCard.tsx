import { StyleSheet, View } from 'react-native';
import { currentUser, Quiz } from './quizSlice';
import { H3, P1, PrimaryCTA } from '../../assest/Typography';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { deleteQuiz, updateQuiz } from '../../API/ApiService';
import { ErrAlert, stringPreview } from '../../app/validation';
import { useAppSelector } from '../../app/hooks';
import { openNotification } from '../../app/notification.ios';

interface BriefPreviewCardProps {
  quiz: Quiz;
  handlePlay: () => void;
  isMyQuiz: boolean;
  navigation: any;
  doReload: any;
}

const BriefPreviewCard = ({
  quiz,
  handlePlay,
  isMyQuiz,
  navigation,
  doReload,
}: BriefPreviewCardProps) => {
  const { token } = useAppSelector(currentUser);
  const handleDelete = () => {
    if (token !== '' && token !== undefined) {
      deleteQuiz({ id: quiz.id.toString() }, token)
        .then(() => {
          openNotification(stringPreview(quiz.title), 'Quiz was Deleted');
          doReload(true);
        })
        .catch(ErrAlert);
    }
  };

  const handlePublish = () => {
    if (token !== undefined && token !== '') {
      updateQuiz(quiz.permalink, { published: true }, token)
        .then(() => {
          openNotification(stringPreview(quiz.title), 'Quiz was Publish');
          doReload(true);
        })
        .catch(ErrAlert);
    }
  };
  return (
    <View style={style.container}>
      <Card style={{ width: 350 }}>
        <H3 style={{ marginBottom: 30 }}>{quiz.title}</H3>
        <View style={style.info}>
          <P1>Total Question: {quiz.questionCount}</P1>
          <PrimaryCTA>#{quiz.permalink}</PrimaryCTA>
        </View>
        {quiz.published && (
          <Button onPress={handlePlay} title={'Play'} color={'primary'} />
        )}
        {isMyQuiz && !quiz.published && (
          <View style={style.rowView}>
            <Button
              onPress={() =>
                navigation.navigate('Edit', {
                  permalink: quiz.permalink,
                })
              }
              title={'edit'}
              color={'secondary'}
              style={style.button}
            />
            <Button
              onPress={handlePublish}
              title={'publish'}
              color={'primary'}
              style={style.button}
            />
          </View>
        )}
        {isMyQuiz && (
          <Button
            onPress={handleDelete}
            title={'X'}
            color={'error'}
            style={style.delete}
          />
        )}
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
  delete: {
    position: 'absolute',
    right: -10,
    top: -20,
    width: 45,
    height: 45,
    borderRadius: 50,
    padding: 0,
    margin: 0,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
  },
});
