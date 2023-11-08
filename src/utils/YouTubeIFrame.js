import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";

export default function YoutubeIframe({ content }) {
    return <YoutubePlayer height={250} play={false} videoId={content} />
  }