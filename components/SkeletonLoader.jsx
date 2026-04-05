import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const SkeletonLoader = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={{ width: "50%", padding: 8 }}>
      <View className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <Animated.View
          className="w-full bg-gray-200 rounded-t-lg"
          style={{ opacity, height: 200 }}
        />
        <View className="p-3">
          <Animated.View
            style={{ opacity }}
            className="h-5 bg-gray-200 rounded mb-2 w-3/4"
          />
          <Animated.View
            style={{ opacity }}
            className="h-4 bg-gray-200 rounded mb-2 w-full"
          />
          <Animated.View
            style={{ opacity }}
            className="h-4 bg-gray-200 rounded mb-3 w-2/3"
          />
          <Animated.View
            style={{ opacity }}
            className="h-6 bg-gray-200 rounded w-1/3"
          />
        </View>
      </View>
    </View>
  );
};

export default SkeletonLoader;
