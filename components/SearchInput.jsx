import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {

  return (
    <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        {...props}
      />

      <TouchableOpacity onPress={() => console.log("pressed")}>
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMethod="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
