import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, { useState } from 'react';

export const AppTextInput: React.FC<TextInputProps> = ({
  ...otherProps
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          focused && {
            borderColor: '#A0A0A0',
          },
        ]}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'medium',
    color: '#1a1a1a',
    alignSelf: 'flex-start',
  },
  input: {
    fontSize: 14,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    color: '#101010',
    borderColor: '#DEDEDE',
  },
});
