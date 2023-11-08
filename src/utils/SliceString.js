import React from "react";
import { Text } from "react-native";
import { moderateScale } from "./Responsive"

export default function SliceString({ string, prefix, length }) {
  let slice = (prefix ? " " : "") + string.slice(0, length) + "...";
    return <Text style={{fontSize: moderateScale(16)}}>{ slice }</Text>;
}
