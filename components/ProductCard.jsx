import { memo } from "react";
import { Image, Text, View } from "react-native";
import { CURRENCY } from "../constants/config";

const ProductCard = ({ product }) => {
  // console.log("Product in ProductCard:", product);
  return (
    <View style={{ width: "50%", padding: 8 }}>
      <Image
        source={{ uri: product?.images?.[0] }}
        className="w-full rounded-lg"
        resizeMode="cover"
        style={{ height: 200, backgroundColor: "#f0f0f0" }}
      />
      <View className="pl-6">
        <Text className="text-lg font-bold">{product?.name}</Text>
        <Text className="text-gray-600">{product?.description}</Text>
        <View className="mt-4 mb-6">
          <Text className="text-gray-600">
            {CURRENCY} {product?.price}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(ProductCard);
