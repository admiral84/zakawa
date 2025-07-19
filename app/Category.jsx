// ExampleScreen.js
import { router } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { screenHeight, screenWidth } from "../constants/Dimensions";
import useQuizStore from "../store/QuizStore";

export default function Mode() {
  const setCategory = useQuizStore((state) => state.setCategory);
  const category = useQuizStore((state) => state.category);

  const handleSelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const goAhead = () => {
    if (!category) {
      Alert.alert("تنبيه", "يرجى اختيار فئة قبل البدء");
      return;
    }
    router.push("./Jeu");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.choixContainer}>
          <Text style={styles.choisir}>اختر الفئة</Text>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity
            onPress={() => handleSelect("religion")}
            style={[styles.options, { backgroundColor: "#FFB300" }]}
          >
            <View style={styles.optionContent}>
              <Ionicons name="book" size={28} color="#FFF" />
              <Text style={styles.optionText}>الدين</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSelect("history")}
            style={[styles.options, { backgroundColor: "#66BB6A" }]}
          >
            <View style={styles.optionContent}>
              <Ionicons name="time" size={28} color="#FFF" />
              <Text style={styles.optionText}>التاريخ</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSelect("geography")}
            style={[styles.options, { backgroundColor: "#42A5F5" }]}
          >
            <View style={styles.optionContent}>
              <Ionicons name="earth" size={28} color="#FFF" />
              <Text style={styles.optionText}>الجغرافيا</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSelect("sciences")}
            style={[styles.options, { backgroundColor: "#FDD835" }]}
          >
            <View style={styles.optionContent}>
              <Ionicons name="flask" size={28} color="#FFF" />
              <Text style={styles.optionText}>العلوم</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSelect("culture")}
            style={[styles.options, { backgroundColor: "#EF5350" }]}
          >
            <View style={styles.optionContent}>
              <Ionicons name="school" size={28} color="#FFF" />
              <Text style={styles.optionText}>الثقافة العامة</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSelect("multiple")}
            style={[styles.options, { backgroundColor: "#7E57C2" }]}
          >
            <View style={styles.optionContent}>
              <Ionicons name="help-circle" size={28} color="#FFF" />
              <Text style={styles.optionText}>اسئلة متنوعة</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bas}>
          <TouchableOpacity style={styles.fleche} onPress={goAhead}>
            <Ionicons name="arrow-forward" size={24} color="#FFF" />
            <Text style={styles.flech}>ابدأ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  optionContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10, // if not supported, use marginRight in icon or text
  },
  optionText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#FFF",
    marginRight: 10,
  },
  optionContainer: {
    height: (3 * screenHeight) / 4,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bas: {
    height: (1 * screenHeight) / 10,
    width: screenWidth / 3,
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: screenHeight / 11,
  },
  fleche: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  flech: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 30,
    marginRight: 10,
  },
});
