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
  onQuestionUpdate: (arg: Question) => void;
  setAdd?: any;
  setEdit?: any;
  totalQues?: number;
  deleteQuestion: any;
}

const QuestionAddEditCard = ({
  index,
  question,
  onQuestionUpdate,
  setAdd,
  setEdit,
  totalQues,
  deleteQuestion,
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
        <View
          style={[style.rowView, { justifyContent: 'space-evenly' }]}
          key={ind + option}>
          <CheckBox
            value={correctOptions.includes(option)}
            onValueChange={() => {
              if (correctOptions.includes(option)) {
                const indexNumber = correctOptions.indexOf(option);
                const newCorrectOptions = correctOptions;
                newCorrectOptions.splice(indexNumber, 1);
                setCorrectOptions([...newCorrectOptions]);
              } else {
                if (type === 'multiple') {
                  correctOptions.push(option);
                  setCorrectOptions([...correctOptions]);
                } else {
                  setCorrectOptions([option]);
                }
              }
            }}
            disabled={option === ''}
          />
          <CTextInput
            value={option}
            setValue={value => {
              const newOptions = [...options];
              newOptions[ind] = trim(value);
              setOptions(newOptions);
            }}
            autoFocus
          />
          <Button
            onPress={() => {
              options.splice(ind, 1);
              setOptions([...options]);
            }}
            title={'x'}
            color={'error'}
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
            onPress={handleSave}
            title={'Save'}
            color={'secondary'}
            style={style.button}
          />
        )}
      </View>
      {totalQues && totalQues > 1 && (
        <Button
          onPress={() => {
            setAdd(false);
            setEdit(null);
            if (question.title === '' || question.options.length < 2) {
              deleteQuestion(index);
            }
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
