import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
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
import SkeletonLoader from "../../components/SkeletonLoader";

const BASE_URL = Constants.expoConfig.extra.BASE_URL;

// Cache configuration
let productCache = {
  data: null,
  timestamp: null,
  expiryTime: 5 * 60 * 1000, // 5 minutes in milliseconds
};

export default function App() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    categoryID: "all",
    sortBy: "all",
    rating: "all",
  });
  const searchTerm = filters.search.trim().toLowerCase();
  const filteredProducts = productData
    .filter((product) => {
      // Search filter
      if (searchTerm) {
        const matchesSearch = [product.name, product.category, product.brand]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(searchTerm));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (
        filters.categoryID !== "all" &&
        product.category !== filters.categoryID
      ) {
        return false;
      }

      // Rating filter
      if (
        filters.rating !== "all" &&
        product.numReviews < parseInt(filters.rating)
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sorting
      if (filters.sortBy === "sellPrice") {
        return a.price - b.price; // Low to high
      } else if (filters.sortBy === "-sellPrice") {
        return b.price - a.price; // High to low
      }
      return 0; // No sorting
    });
  const shouldShowEmptyState = !isLoading && filteredProducts.length === 0;

  const fetchProductData = async () => {
    setIsLoading(true);

    try {
      // Check if cache is valid
      const now = Date.now();
      if (
        productCache.data &&
        productCache.timestamp &&
        now - productCache.timestamp < productCache.expiryTime
      ) {
        console.log("Using cached data");
        setProductData(productCache.data);
        setIsLoading(false);
        return;
      }

      // Cache is stale or empty, fetch from server
      console.log("Fetching from server");
      const response = await fetch(`${BASE_URL}/products?limit=100`);
      const data = await response.json();

      // Update cache
      productCache.data = data.data;
      productCache.timestamp = Date.now();

      setProductData(data.data);
    } catch (error) {
      console.log("Error fetching product data:", error);
      // Use cached data if available, even if stale
      if (productCache.data) {
        console.log("Using stale cache due to error");
        setProductData(productCache.data);
      } else {
        setProductData([]);
      }
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

  //handle filter changes
  const filterHandler = (filterData) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filterData,
    }));
  };

  // Force refresh - clears cache
  const handleRefresh = async () => {
    productCache.data = null;
    productCache.timestamp = null;
    await fetchProductData();
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.categoryID !== "all") count++;
    if (filters.sortBy !== "all") count++;
    if (filters.rating !== "all") count++;
    return count;
  };

  // Remove individual filter
  const removeFilter = (filterKey) => {
    setFilters((prev) => ({ ...prev, [filterKey]: "all" }));
  };

  // Handle product press
  const handleProductPress = (product) => {
    // Navigate to product detail page (to be implemented)
    console.log("Product pressed:", product.name);
  };

  return (
    <SafeAreaView className="min-h-screen">
      <View className="flex-1 pb-11">
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
            className="border border-[#be7b34] rounded-md py-1 px-3 relative"
            onPress={toggleFilterModal}
          >
            <Text className="text-center text-lg font-semibold text-[#be7b34]">
              Filter
            </Text>
            {getActiveFilterCount() > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">
                  {getActiveFilterCount()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Active Filter Chips */}
        {getActiveFilterCount() > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 py-2"
          >
            <View className="flex-row gap-2">
              {filters.categoryID !== "all" && (
                <View className="flex-row items-center bg-[#be7b34] rounded-full px-3 py-1">
                  <Text className="text-white text-sm mr-1">
                    {filters.categoryID}
                  </Text>
                  <Pressable
                    onPress={() => removeFilter("categoryID")}
                    hitSlop={8}
                  >
                    <FontAwesome name="times" size={12} color="white" />
                  </Pressable>
                </View>
              )}
              {filters.sortBy !== "all" && (
                <View className="flex-row items-center bg-[#be7b34] rounded-full px-3 py-1">
                  <Text className="text-white text-sm mr-1">
                    {filters.sortBy === "sellPrice"
                      ? "Price: Low to High"
                      : "Price: High to Low"}
                  </Text>
                  <Pressable onPress={() => removeFilter("sortBy")} hitSlop={8}>
                    <FontAwesome name="times" size={12} color="white" />
                  </Pressable>
                </View>
              )}
              {filters.rating !== "all" && (
                <View className="flex-row items-center bg-[#be7b34] rounded-full px-3 py-1">
                  <Text className="text-white text-sm mr-1">
                    {filters.rating}+ Reviews
                  </Text>
                  <Pressable onPress={() => removeFilter("rating")} hitSlop={8}>
                    <FontAwesome name="times" size={12} color="white" />
                  </Pressable>
                </View>
              )}
            </View>
          </ScrollView>
        )}

        <FlatList
          data={isLoading ? Array(6).fill({}) : filteredProducts}
          numColumns={2}
          renderItem={({ item, index }) =>
            isLoading ? (
              <SkeletonLoader key={`skeleton-${index}`} />
            ) : (
              <ProductCard
                product={item}
                onPress={() => handleProductPress(item)}
              />
            )
          }
          keyExtractor={(item, index) =>
            isLoading ? `skeleton-${index}` : item.id.toString()
          }
          contentContainerStyle={shouldShowEmptyState ? { flexGrow: 1 } : null}
          columnWrapperStyle={{ justifyContent: "flex-start" }}
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
          }
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
        filterHandler={filterHandler}
      />
    </SafeAreaView>
  );
}
