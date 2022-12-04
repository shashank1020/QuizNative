import {
  SafeAreaView,
  View,
  Button,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { useEffect, useState } from 'react';
import { getAllQuiz } from '../API/ApiService';
import {
  currentUser,
  doLogout,
  myQuiz,
  publishedQuiz,
  Quiz,
  setMyQuiz,
  setPublishedQuiz,
} from '../features/quiz/quizSlice';
import { H1, H4, P1, SecondaryCTA } from '../assest/Typography';
import BriefPreviewCard from '../features/quiz/BriefPreviewCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useIsFocused } from '@react-navigation/native';
import CustomButton from '../components/Button';
import { ErrAlert } from '../app/validation';

const Dashboard = ({ navigation, route }: any) => {
  const isFocused = useIsFocused();
  const _screen = route.name;
  const User = useAppSelector(currentUser);
  const allQuiz = useAppSelector(publishedQuiz);
  const UserQuiz = useAppSelector(myQuiz);
  const dispatch = useAppDispatch();
  const page = 1;
  const [reload, doReload] = useState(false);
  let pageQuiz = _screen === 'Dashboard' ? allQuiz : UserQuiz;

  useEffect(() => {
    if (_screen === 'MyQuiz' && User.token !== '') {
      getAllQuiz({ page }, User.token)
        .then(data => {
          dispatch(setMyQuiz(data?.quizes));
          doReload(false);
        })
        .catch(ErrAlert);
    } else {
      getAllQuiz({ page })
        .then(data => {
          dispatch(setPublishedQuiz(data?.quizes));
          doReload(false);
        })
        .catch(ErrAlert);
    }
  }, [User.token, _screen, dispatch, isFocused, navigation, reload]);

  const handlePlay = (permalink: string, title: string) => {
    navigation.navigate('PlayQuiz', { permalink, title });
  };

  const renderer = ({ item, index }: ListRenderItemInfo<Quiz>) => {
    const permalink = item.permalink;
    const title = item.title;
    return (
      <BriefPreviewCard
        navigation={navigation}
        quiz={item}
        index={index}
        handlePlay={() => handlePlay(permalink, title)}
        isMyQuiz={_screen === 'MyQuiz' && User.token !== ''}
        doReload={doReload}
      />
    );
  };

  if (_screen === 'MyQuiz' && !UserQuiz && User.email !== '') {
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
        data={pageQuiz}
        renderItem={renderer}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

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
