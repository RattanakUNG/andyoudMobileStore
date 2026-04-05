import { memo } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CURRENCY } from "../constants/config";

const ProductCard = ({ product, onPress }) => {
  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <FontAwesome key={i} name="star" size={12} color="#FFB800" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FontAwesome key={i} name="star-half-o" size={12} color="#FFB800" />,
        );
      } else {
        stars.push(
          <FontAwesome key={i} name="star-o" size={12} color="#FFB800" />,
        );
      }
    }
    return stars;
  };

  return (
    <View style={{ width: "50%", padding: 6 }}>
      <Pressable
        onPress={onPress}
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden active:opacity-70"
      >
        <Image
          source={{ uri: product?.images?.[0] }}
          className="w-full"
          resizeMode="cover"
          style={{ height: 180, backgroundColor: "#f5f5f5" }}
        />
        <View className="p-3">
          <Text className="text-base font-bold mb-1" numberOfLines={1}>
            {product?.name}
          </Text>
          <Text className="text-xs text-gray-500 mb-2" numberOfLines={2}>
            {product?.description}
          </Text>

          {/* Rating Section */}
          {product?.rating > 0 && (
            <View className="flex-row items-center mb-2">
              {renderStars(product.rating)}
              <Text className="text-xs text-gray-500 ml-1">
                ({product?.numReviews || 0})
              </Text>
            </View>
          )}

          {/* Price and Add to Cart */}
          <View className="flex-row items-center justify-between mt-1">
            <Text className="text-base font-bold text-[#be7b34]">
              {CURRENCY}{" "}
              {typeof product?.price === "number"
                ? product.price.toFixed(2)
                : product?.price}
            </Text>
            <Pressable
              className="bg-[#be7b34] rounded-full p-2 active:opacity-70"
              onPress={(e) => {
                e.stopPropagation();
                // Add to cart functionality to be implemented
                console.log("Add to cart:", product?.name);
              }}
            >
              <FontAwesome name="shopping-cart" size={14} color="white" />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default memo(ProductCard);
