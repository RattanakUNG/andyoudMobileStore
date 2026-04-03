import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import Constants from "expo-constants";
import ProductCard from "../../components/ProductCard";
import FilterModal from "../../components/FilterModal";

const BASE_URL = Constants.expoConfig.extra.BASE_URL;

export default function App() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({ search: "" });
  const searchTerm = filters.search.trim().toLowerCase();
  const filteredProducts = productData.filter((product) => {
    if (!searchTerm) {
      return true;
    }

    return [product.name, product.category, product.brand]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(searchTerm));
  });
  const shouldShowEmptyState = !isLoading && filteredProducts.length === 0;

  const fetchProductData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/products?limit=100`);
      const data = await response.json();
      setProductData(data.data);
    } catch (error) {
      console.log("Error fetching product data:", error);
      setProductData([]);
    } finally {
      setIsLoading(false);
    }
  };
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const toggleFilterModal = () => {
    setOpenFilterModal(!openFilterModal);
  };

  // console.log("Product Data:", productData);

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <SafeAreaView className="min-h-screen">
      <View className="flex-1 items-center justify-center pb-11">
        <View className="flex-row items-center justify-between w-full px-4 py-2">
          <StatusBar style="auto" />
          <View className="p-2 relative w-10/12">
            <FontAwesome
              name="search"
              size={20}
              color="gray"
              className="absolute left-6 top-4"
            />
            <TextInput
              placeholder="Search products..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-9"
              onChangeText={(text) => setFilters({ ...filters, search: text })}
              value={filters.search}
            />
          </View>
          <TouchableOpacity
            className="border border-[#be7b34] rounded-md py-1 px-3"
            onPress={toggleFilterModal}
          >
            <Text className="text-center text-lg font-semibold text-[#be7b34]">
              Filter
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredProducts}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={shouldShowEmptyState ? { flexGrow: 1 } : null}
          ListEmptyComponent={
            shouldShowEmptyState ? (
              <View className="flex-1 items-center justify-center px-6">
                <Text className="text-base text-gray-500">
                  There is no product found.
                </Text>
              </View>
            ) : null
          }
        />
      </View>
      <FilterModal
        openFilterModal={openFilterModal}
        toggleFilterModal={toggleFilterModal}
        productTypes={productData.map((product) => product.category)}
      />
    </SafeAreaView>
  );
}
