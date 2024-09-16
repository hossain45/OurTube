import { useState } from "react";
// import { ResizeMode, Video } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const VideoCard = ({ video }) => {
  // console.log(video.thumbnail, video.title, video.video);
  // console.log(video.creator.avatar);
  // console.log(video.creator.username);
  // console.log(video.thumbnail);

  const getVideoIdFromUrl = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  const videoUrl = "https://www.youtube.com/watch?v=-sB12gk9ESA";
  const videoId = getVideoIdFromUrl(videoUrl);

  const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {video.creator.username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        // <Video
        //   // source={{ uri: video.video }}
        //   source={{
        //     uri: "https://player.vimeo.com/video/949582778?h=d60220d68d",
        //   }}
        //   className="w-full h-60 rounded-xl mt-3"
        //   resizeMode={ResizeMode.CONTAIN}
        //   useNativeControls
        //   shouldPlay
        //   onPlaybackStatusUpdate={(status) => {
        //     if (status.didJustFinish) {
        //       setPlay(false);
        //     }
        //   }}
        // />
        <YoutubePlayer
          height={240}
          play={true}
          videoId={videoId} // YouTube video ID
          onChangeState={(event) => {
            if (event === "ended") {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: video.thumbnail }}
            style={{ width: "100%", height: "100%" }} // fallback in case className isn't applied correctly
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
