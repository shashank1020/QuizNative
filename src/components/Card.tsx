import { FlexStyle, StyleProp, StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';

interface CardProps {
  style?: StyleProp<FlexStyle>;
  children: ReactNode;
}

const Card = ({ style, children }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    marginVertical: 15,
    marginHorizontal: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
});
