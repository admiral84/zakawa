import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { screenHeight } from "../../constants/Dimensions";
export default function Home() {
  const translateY = useRef(new Animated.Value(0)).current;
  const rotateText = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 3 * (screenHeight / 4),
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: screenHeight / 3,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateText, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push("/Mode");
    });
  }, []);
  const rotateInterpolate = rotateText.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textContainer,
          {
            transform: [{ translateY }, { rotate: rotateInterpolate }],
          },
        ]}
      >
        <Text style={styles.texte}>ذكاوة</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0482DE",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  texte: {
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
  },
  textContainer: {
    alignItems: "center",
  },
});
