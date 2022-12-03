import { StyleSheet, Switch, View } from 'react-native';
import Card from '../../components/Card';
import { P2, Weight } from '../../assest/Typography';
import CTextInput from '../../components/TextInput';
import { useState } from 'react';
import Button from '../../components/Button';
import { Question } from './quizSlice';
import CheckBox from '@react-native-community/checkbox';
import {
  hasDuplicateOptions,
  trim,
  validateQuestion,
} from '../../app/validation';

interface QuestionAddEditCardProps {
  index: number;
  question: Question;
  onQuestionUpdate: any;
}

const QuestionAddEditCard = ({
  index,
  question,
  onQuestionUpdate,
}: QuestionAddEditCardProps) => {
  const [title, setTitle] = useState(question.title);
  const [options, setOptions] = useState<string[]>(question.options);
  const [correctOptions, setCorrectOptions] = useState<string[]>(
    question.correctOptions || [],
  );
  const [type, setType] = useState(question.type || 'single');

  const handleSave = () => {
    const newCorrectOptions = correctOptions.filter(option =>
      options.includes(option),
    );
    setCorrectOptions([...newCorrectOptions]);
    if (
      validateQuestion({
        title,
        options,
        type,
        correctOptions: newCorrectOptions,
      }) &&
      hasDuplicateOptions(options)
    ) {
      onQuestionUpdate({
        title,
        options,
        type,
        correctOptions: newCorrectOptions,
      });
    }
  };
  return (
    <Card style={style.card}>
      <View style={style.rowView}>
        <P2 fontWeight={Weight.SEMIBOLD}>Question {index + 1}:</P2>
        <CTextInput
          value={title}
          setValue={setTitle}
          placeholder="E.g: What are Promise?"
        />
      </View>
      <View style={[style.rowView, { justifyContent: 'space-evenly' }]}>
        <P2>Question is multiple choice type: </P2>
        <Switch
          value={type === 'multiple'}
          onValueChange={e => {
            setType(() => {
              if (e) {
                return 'multiple';
              } else {
                return 'single';
              }
            });
          }}
        />
      </View>
      {options.map((option, ind) => (
        <View style={[style.rowView, { justifyContent: 'space-evenly' }]}>
          <CheckBox value={correctOptions.includes(option)} />
          <CTextInput
            value={option}
            setValue={value => {
              const newOptions = [...options];
              newOptions[ind] = trim(value);
              setOptions(newOptions);
            }}
          />
        </View>
      ))}
      <View style={style.rowView}>
        {options.length < 5 && (
          <Button
            onPress={() => setOptions([...options, ''])}
            title={'Add Option'}
            color={'primary'}
            style={style.button}
          />
        )}
        {options.length > 1 && (
          <Button
            onPress={() => {}}
            title={'Save'}
            color={'secondary'}
            style={style.button}
          />
        )}
      </View>
      {index > 0 && (
        <Button
          onPress={() => {
            console.log('used');
          }}
          title={'x'}
          color={'error'}
          style={style.delete}
        />
      )}
    </Card>
  );
};

export default QuestionAddEditCard;

const style = StyleSheet.create({
  card: {
    width: 350,
    marginTop: 30,
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
});
