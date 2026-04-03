import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

// const CategoryOptions = [
//   { value: "all", label: "All" },
//   { value: "men", label: "Men's Clothings" },
//   { value: "women", label: "Women's Clothings" },
//   { value: "kid", label: "Kid's Clothings" },
// ];

const SortingOptions = [
  { value: "all", label: "All" },
  { value: "-sellPrice", label: "Price high to low" },
  { value: "sellPrice", label: "Price low to high" },
];

const RatingOptions = [
  { value: "all", label: "all" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const FilterModal = ({ openFilterModal, toggleFilterModal, productTypes }) => {
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
          <Text className="text-xl font-semibold my-4">Category</Text>
          <View className="flex-row flex-wrap gap-3">
            {[...new Set(productTypes)].map((type, index) => (
              <Pressable
                className="border border-gray-300 rounded-lg py-2 px-4"
                key={index}
              >
                <Text>{type}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="mb-4">
          <Text className="text-xl font-semibold my-4">Sort By</Text>
          <View className="flex-row flex-wrap gap-3">
            {SortingOptions.map((option, index) => (
              <Pressable
                className="border border-gray-300 rounded-lg py-2 px-4"
                key={index}
              >
                <Text>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="mb-4">
          <Text className="text-xl font-semibold my-4">Rating</Text>
          <View className="flex-row flex-wrap gap-3">
            {RatingOptions.map((option, index) => (
              <Pressable
                className="border border-gray-300 rounded-lg py-2 px-4"
                key={index}
              >
                <Text>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View className="flex-row gap-3">
          <TouchableOpacity className="border border-blue-500 bg-blue-500 rounded-md py-1 px-3 flex-1 max-w-[180px]">
            <Text className="text-center text-lg font-semibold text-white">
              Apply
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="border border-blue-500 rounded-md py-1 px-3 flex-1 max-w-[180px]">
            <Text className="text-center text-lg font-semibold text-blue-500">
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
