import { StyleSheet, View } from 'react-native';
import { Question } from './quizSlice';
import { H3, Note, P1 } from '../../assest/Typography';
import CheckBox from '@react-native-community/checkbox';
import Card from '../../components/Card';

interface QuestionCardProps {
  question: Question;
  index: number;
  updateChosenOption: any;
}

const QuestionCard = ({
  index,
  question: { chosenOptions, options, title, type },
  updateChosenOption,
}: QuestionCardProps) => {
  return (
    <Card>
      <View style={style.pillBadge}>
        <Note>{type} choice</Note>
      </View>
      <H3 paddingTop={10}>{title}</H3>
      {options.length > 0 &&
        options.map(option => (
          <View style={style.checkboxContainer}>
            <CheckBox
              value={chosenOptions?.includes(option) || false}
              onValueChange={e => updateChosenOption(index, option, e)}
              style={style.checkbox}
            />
            <P1 flex={1}>{option}</P1>
          </View>
        ))}
    </Card>
  );
};

export default QuestionCard;

const style = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 10,
  },
  pillBadge: {
    position: 'absolute',
    right: '39%',
    top: -14,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
