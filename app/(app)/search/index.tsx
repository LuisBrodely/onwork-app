import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react'
import { CategoryList } from "@/shared/components/CategoryList";

export default function Search() {
  const snapPoints = useMemo(() => ['30%'], []);

  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  return (
    <View style={[styles.container, {
      backgroundColor
        : isOpen ? 'gray' : 'white'
    }]}>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSnapPress(0)}
      >
        <Text>Open modal</Text>
      </TouchableOpacity>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpen(false)}
      >
        <BottomSheetView>
          <CategoryList />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    borderRadius: 20,
    paddingVertical: 15,
    marginVertical: 20,
    paddingLeft: 30,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    marginTop: 64
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    borderColor: "#DEDEDE"
  },
  buttonIcon: {
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
    borderColor: "#DEDEDE"
  },
  buttonText: {
    color: '#9C9C9C',
  },
});
