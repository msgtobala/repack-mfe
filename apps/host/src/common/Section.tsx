import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Section: React.FC<SectionProps> = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text>{title}</Text>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {},
});

export default Section;
