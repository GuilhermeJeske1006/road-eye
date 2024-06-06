import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function BtnPrimary(props: {
  fn: () => void;
  text: string;
  icon?: string;
}) {
  return (
    <TouchableOpacity onPress={props.fn} style={[styles.button, { marginTop: 30, }]}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#BC1C2C',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});
