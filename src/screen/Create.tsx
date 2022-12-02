import { FlexStyle, SafeAreaView, StyleProp, StyleSheet, View } from "react-native";
import { B1, B2, H1, H2 } from '../assest/Typography';
import Card from '../components/Card';
import { Question } from '../features/quiz/quizSlice';
import { ReactNode } from "react";
import TextInput from "../components/TextInput";

const emptyCardValues: Question = {
  title: '',
  chosenOptions: [],
  correctOptions: [],
  options: [],
  type: 'single',
};

const CreateQuiz = () => {

  return (
    <SafeAreaView>
      <View style={style.container}>
        <H2>Create</H2>
      </View>
      <View style={style.rowView}>

      </View>
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
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
