import { useEffect, useState } from "react";
import { StyleSheet, Text,ScrollView, TouchableOpacity, View } from "react-native";

import { screenHeight, screenWidth } from "../constants/Dimensions";
import { getElement, initDb } from "../db/database";
import useQuizStore from "../store/QuizStore";

export default function Jeu() {
  const setLoaded = useQuizStore((state) => state.setLoaded);
  const loaded = useQuizStore((state) => state.loaded);
  const category = useQuizStore((state) => state.category);
  const setId = useQuizStore((state) => state.setId);
  const id = useQuizStore((state) => state.id);
  const setScore = useQuizStore((state) => state.setScore);
  const score = useQuizStore((state) => state.score);
  const [answered, setAnswered] = useState(false);
  const level = useQuizStore((state) => state.level);
  const setLevel = useQuizStore((state) => state.setLevel);

  const [data, setData] = useState(null);
  const [bgColors, setBgColors] = useState([]);

  const baseColors = ["#26A69A", "#FFB300", "#EF5350", "#66BB6A"];
  //handlePress

  // Random background colors
  useEffect(() => {
    const getBgColor = (colors) => {
      const copy = [...colors];
      const result = [];

      for (let i = 0; i < 4 && copy.length > 0; i++) {
        const index = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(index, 1)[0]);
      }

      return result;
    };

    setBgColors(getBgColor(baseColors));
  }, [id]);

  // Initialize database
  useEffect(() => {
    const initialize = async () => {
      try {
        if (!loaded) {
          await initDb();
          setLoaded(true);
        }
      } catch (e) {
        console.log("Unable to initialize database", e);
      }
    };
    initialize();
  }, []);

  // Load data
  useEffect(() => {
    const getData = async () => {
      try {
        const d = await getElement(id, category);
        if (!d) {
          console.warn("No question found for id:", id, "category:", category);
          return;
        }
        setData(d);
      } catch (error) {
        console.log("Cannot fetch the given data", error);
      }
    };

    if (id && category) {
      getData();
    }
  }, [id, category]);

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  const handlePress = (answer) => {
    if (answered) return;
    setAnswered(true);
    if (data.trueanswer === answer) {
      setScore(score + 1);
    }
    if (id > 60) return;
    setAnswered(false);
    setId(id + 1);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.scoreStyle}>
        <View style={styles.progress}>
          <View
            style={[
              { backgroundColor: "yellow" },
              { borderRadius: 10 },
              { height: screenHeight / 50 },
              { width: (score / 10) * (screenWidth / 3) },
            ]}
          ></View>
        </View>
        <View>
          <Text style={styles.scoreText}>{score}/10</Text>
        </View>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{data?.question ?? "Loading..."}</Text>
      </View>
      <View style={styles.optionContainer}>
        {data.options?.map((answer, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(answer)}
            style={[
              styles.option,
              { backgroundColor: bgColors[index] || "#ccc" }, // fallback color
            ]}
          >
            <Text style={styles.optionText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0097A7",
  },
  questionContainer: {
    height: screenHeight / 10,
    justifyContent: "center",
    alignItems: "center",
  },
  question: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginTop: screenHeight / 20,
    paddingHorizontal: 10,
    height: screenHeight / 6,
  },
  option: {
    height: 50,
    width: (9 * screenWidth) / 10,
    borderRadius: 8,
    marginTop: screenHeight / 50,
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
    height: (3 * screenHeight) / 5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  forward: {
    height: (9 * screenHeight) / 10,
  },
  nextTouch: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  nextText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 40,
  },
  scoreStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 6,
    height: (1 * screenHeight) / 10,
    justifyContent: "center",
  },
  scoreText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 30,
  },
  progress: {
    marginRight: screenWidth / 20,
    width: screenWidth / 3,
    height: screenHeight / 55,

    borderRadius: 10,
  },
});
