import { SafeAreaView, View, Button, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getAllQuiz } from '../API/ApiService';
import { currentUser, doLogout, Quiz } from '../features/quiz/quizSlice';
import { B1, B2, H1, H3, H4, P1, SecondaryCTA } from '../assest/Typography';
import BriefPreviewCard from '../features/quiz/BriefPreviewCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useIsFocused } from '@react-navigation/native';
import CustomButton from '../components/Button';

const DashboardBase = ({ navigation, route }: any) => {
  const isFocused = useIsFocused();
  const [allQuizData, setAllQuizData] = useState<Quiz[]>([]);
  const _screen = route.name;
  const User = useAppSelector(currentUser);
  const dispatch = useAppDispatch();
  const page = 1;

  useEffect(() => {
    if (_screen === 'MyQuiz' && User.token !== '') {
      getAllQuiz({ page }, User.token).then(data => {
        setAllQuizData(data?.quizes);
      });
    } else {
      getAllQuiz({ page }).then(data => {
        setAllQuizData(data?.quizes);
      });
    }
  }, [User.token, _screen, isFocused]);

  const handlePlay = (permalink: string, title: string) => {
    navigation.navigate('PlayQuiz', { permalink, title });
  };

  const renderer = (item: { item: Quiz }) => {
    const permalink = item.item.permalink;
    const title = item.item.title;
    return (
      <BriefPreviewCard
        quiz={item.item}
        handlePlay={() => handlePlay(permalink, title)}
      />
    );
  };

  if (allQuizData.length === 0) {
    return (
      <SafeAreaView>
        <SecondaryCTA>Its Empty...</SecondaryCTA>
        <CustomButton
          title={'Lets fill this up'}
          onPress={() => navigation.navigate('Create')}
          color="secondary"
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={style.container}>
      <View style={style.head}>
        {_screen !== 'MyQuiz' && (
          <View style={style.head}>
            <H1>Quizz!</H1>
            <P1>Here are some playable quiz:-</P1>
          </View>
        )}
        <View style={[style.herderPosition, { right: 15 }]}>
          {User && User.email === '' && (
            <Button
              title={'Login'}
              onPress={() => navigation.navigate('Login')}
            />
          )}
          {_screen !== 'MyQuiz' && User.email !== '' && (
            <Button title={'Logout'} onPress={() => dispatch(doLogout())} />
          )}
        </View>
        {_screen !== 'MyQuiz' && User.email !== '' && (
          <View style={[style.herderPosition, { left: 15, top: 15 }]}>
            <H4 color={'darkgreen'}>
              Hi {User && User.name && User.name.split(' ')[0]}
            </H4>
          </View>
        )}
      </View>
      <FlatList
        keyExtractor={item => String(item.id)}
        data={allQuizData}
        renderItem={renderer}
      />
    </SafeAreaView>
  );
};

export default DashboardBase;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  herderPosition: { position: 'absolute', top: 5 },
});
