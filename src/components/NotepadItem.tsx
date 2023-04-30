import { TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import type { Notepad } from "../types";

export type NotepadItemProps = {
  onPress: () => void;
  notepad: Notepad;
};

const ItemTouchable = styled.TouchableOpacity`
  padding-vertical: 18px;
  padding-horizontal: 9px;
  border-bottom-width: 1px;
  border-bottom-color: #121212;
`;

const ItemDate = styled.Text`
  font-size: 10px;
  color: #212121;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #121212;
`;

const ItemSubtitle = styled.Text`
  font-size: 14px;
  color: #212121;
`;

export function NotepadItem({
  onPress,
  notepad: { title, subtitle, created_at },
}: NotepadItemProps) {
  return (
    <ItemTouchable onPress={onPress}>
      <ItemDate>{new Date(created_at).toLocaleDateString()}</ItemDate>
      <ItemTitle>{title}</ItemTitle>
      <ItemSubtitle>{subtitle}</ItemSubtitle>
    </ItemTouchable>
  );
}
