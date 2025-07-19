// ExampleScreen.js
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import useQuizStore from "../store/QuizStore";
export default function Mode() {
  const setMode = useQuizStore((state) => state.setMode);
  const handleSelect = (selectedMode) => {
    setMode(selectedMode);
    router.push("./Category");
  };
  return (
    <View style={styles.container}>
      <View style={styles.choixContainer}>
        <Text style={styles.choisir}>اختر النمط</Text>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          onPress={() => handleSelect("classic")}
          style={[styles.options, { backgroundColor: "#42A5F5" }]}
        >
          <Text style={styles.optionText}>كلاسيكي</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect("time")}
          style={[styles.options, { backgroundColor: "#FFB300" }]}
        >
          <Text style={styles.optionText}>سباق مع الزمن</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect("survive")}
          style={[styles.options, { backgroundColor: "#EF5350" }]}
        >
          <Text style={styles.optionText}>وضع البقاء</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSelect("multiplayer")}
          style={[styles.options, { backgroundColor: "#7E57C2" }]}
        >
          <Text style={styles.optionText}>متعدد اللاعبين</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0482DE",
  },
  choisir: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#FFF",
  },
  choixContainer: {
    height: screenHeight / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  options: {
    height: 60,
    width: (9 * screenWidth) / 10,
    borderRadius: 8,
    marginTop: screenHeight / 28,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFF",
  },
  optionContainer: {
    height: (3 * screenHeight) / 4,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
