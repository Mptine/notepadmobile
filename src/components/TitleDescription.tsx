import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";

export type TitleDescriptionProps = {
  title: string;
  description: string;
};

export function TitleDescriptionBasic({
  title,
  description,
}: TitleDescriptionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const Container = styled.View`
  margin-vertical: 12px;
  margin-horizontal: 20px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #302e2e;
`;

export function TitleDescriptionMasters({
  title,
  description,
}: TitleDescriptionProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#34495e",
  },
  container: {
    marginVertical: 12,
    marginHorizontal: 20,
  },
});
