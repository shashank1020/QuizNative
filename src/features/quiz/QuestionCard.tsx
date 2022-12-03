import { StyleSheet, View } from 'react-native';
import { Question } from './quizSlice';
import { Note, P1, P2, Weight } from "../../assest/Typography";
import CheckBox from '@react-native-community/checkbox';
import Card from '../../components/Card';
import Button from '../../components/Button';

interface QuestionCardProps {
  question: Question;
  index: number;
  updateChosenOption?: any;
  deleteQuestion?: any;
  isPublished?: boolean;
  setEdit?: any;
  isCreateScreen?: boolean | undefined;
}

const QuestionCard = ({
  index,
  question: { chosenOptions, options, title, type, correctOptions },
  updateChosenOption,
  deleteQuestion,
  isPublished,
  setEdit,
  isCreateScreen,
}: QuestionCardProps) => {
  return (
    <Card style={{ width: 350}}>
      <View style={style.pillBadge}>
        <Note>{type} choice</Note>
      </View>
      <P2 fontWeight={Weight.SEMIBOLD} style={{ paddingTop: 10 }}>
        Question {index + 1}: {title}
      </P2>
      {options.length > 0 &&
        options.map(option => (
          <View style={style.checkboxContainer} key={option}>
            <CheckBox
              value={
                isCreateScreen
                  ? correctOptions?.includes(option)
                  : chosenOptions?.includes(option)
              }
              onValueChange={e => updateChosenOption(index, option, e)}
              style={style.checkbox}
              disabled={isCreateScreen}
            />
            <P1 style={{ flex: 1 }}>{option}</P1>
          </View>
        ))}
      {isCreateScreen && !isPublished && (
        <View style={style.rowView}>
          <Button
            onPress={() => deleteQuestion(index)}
            title={'Delete'}
            color={'error'}
            style={style.button}
          />
          <Button
            onPress={() => setEdit(index)}
            title={'Edit'}
            color={'secondary'}
            style={style.button}
          />
        </View>
      )}
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
  button: {
    flex: 1,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
