import { Image, Text, View } from "react-native";
import { CURRENCY } from "../constants/config";

const ProductCard = ({ product }) => {
  // console.log("Product in ProductCard:", product);
  return (
    <View className="w-1/2 p-2">
      <Image
        source={{ uri: product?.images?.[0] }}
        className="w-full h-64 rounded-lg p-4"
        resizeMode="cover"
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

export default ProductCard;
