import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SortingOptions = [
  { value: "all", label: "All" },
  { value: "-sellPrice", label: "Price high to low" },
  { value: "sellPrice", label: "Price low to high" },
];

const RatingOptions = [
  { value: "all", label: "All" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const FilterModal = ({
  openFilterModal,
  toggleFilterModal,
  productTypes,
  filterHandler,
}) => {
  const [filters, setFilters] = useState({
    categoryID: "all",
    sortBy: "all",
    rating: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  // console.log("Current Filters:", filters);
  const handleApplyFilters = () => {
    // console.log("Applying Filters:", filters);
    filterHandler(filters);
    toggleFilterModal();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      categoryID: "all",
      sortBy: "all",
      rating: "all",
    };
    setFilters(resetFilters);
    filterHandler(resetFilters);
    toggleFilterModal();
  };

  return (
    <Modal
      visible={openFilterModal}
      transparent={true}
      animationType="slide"
      onRequestClose={toggleFilterModal}
    >
      <View className="h-full w-full bg-white p-10 mt-16 shadow-lg">
        <Text className="text-2xl font-bold mb-4 text-center">Filters</Text>
        <View className="mb-4">
          <Text className="text-xl font-semibold my-4">Category:</Text>
          <View className="flex-row flex-wrap gap-3">
            <Pressable
              className="rounded-lg py-2 px-4"
              style={
                filters.categoryID === "all"
                  ? styles.activeFilterButton
                  : styles.inactiveFilterButton
              }
              onPress={() => handleFilterChange("categoryID", "all")}
            >
              <Text
                style={
                  filters.categoryID === "all"
                    ? styles.activeFilterText
                    : styles.inactiveFilterText
                }
              >
                All
              </Text>
            </Pressable>
            {[...new Set(productTypes)].map((type, index) => (
              <Pressable
                className="rounded-lg py-2 px-4"
                style={
                  filters.categoryID === type
                    ? styles.activeFilterButton
                    : styles.inactiveFilterButton
                }
                key={index}
                onPress={() => handleFilterChange("categoryID", type)}
              >
                <Text
                  style={
                    filters.categoryID === type
                      ? styles.activeFilterText
                      : styles.inactiveFilterText
                  }
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="mb-4">
          <Text className="text-xl font-semibold my-4">Sort By:</Text>
          <View className="flex-row flex-wrap gap-3">
            {SortingOptions.map((option, index) => (
              <Pressable
                className="rounded-lg py-2 px-4"
                style={
                  filters.sortBy === option.value
                    ? styles.activeFilterButton
                    : styles.inactiveFilterButton
                }
                key={index}
                onPress={() => handleFilterChange("sortBy", option.value)}
              >
                <Text
                  style={
                    filters.sortBy === option.value
                      ? styles.activeFilterText
                      : styles.inactiveFilterText
                  }
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="mb-4">
          <Text className="text-xl font-semibold my-4">Popularity:</Text>
          <View className="flex-row flex-wrap gap-3">
            {RatingOptions.map((option, index) => (
              <Pressable
                className="rounded-lg py-2 px-4"
                style={
                  filters.rating === option.value
                    ? styles.activeFilterButton
                    : styles.inactiveFilterButton
                }
                key={index}
                onPress={() => handleFilterChange("rating", option.value)}
              >
                <Text
                  style={
                    filters.rating === option.value
                      ? styles.activeFilterText
                      : styles.inactiveFilterText
                  }
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="flex-row gap-3 mt-12">
          <TouchableOpacity
            className="rounded-md py-1 px-3 flex-1 max-w-[180px]"
            style={styles.primaryButton}
            onPress={handleApplyFilters}
          >
            <Text
              className="text-center text-lg font-semibold"
              style={styles.primaryColor}
            >
              Apply
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-md py-1 px-3 flex-1 max-w-[180px]"
            style={styles.inactiveButton}
            onPress={handleResetFilters}
          >
            <Text
              className="text-center text-lg font-semibold"
              style={styles.inactiveColor}
            >
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#be7b34",
    borderWidth: 1,
    borderColor: "#be7b34",
  },
  primaryColor: {
    color: "#fff",
  },
  inactiveButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
  },
  inactiveColor: {
    color: "#666",
  },
  activeFilterButton: {
    backgroundColor: "#be7b34",
    borderWidth: 1,
    borderColor: "#be7b34",
  },
  inactiveFilterButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#666",
  },
  activeFilterText: {
    color: "#fff",
  },
  inactiveFilterText: {
    color: "#666",
  },
});

export default FilterModal;
