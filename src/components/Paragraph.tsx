import { Text, StyleSheet } from "react-native";
import styled from "styled-components/native";

export const ParagraphMasters = styled.Text`
  font-size: 16px;
  line-height: 18px;
  color: #302e2e;
  margin-vertical: 8px;
`;

type ParagraphProps = {
  children: string;
};

export function Paragraph({ children }: ParagraphProps) {
  return <Text style={styles.paragraphStyle}>{children}</Text>;
}

const styles = StyleSheet.create({
  paragraphStyle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#302e2e",
    marginVertical: 8,
  },
});
