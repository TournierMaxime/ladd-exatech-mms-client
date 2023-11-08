import React, { useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Feather, AntDesign, Entypo } from "@expo/vector-icons"
import accordion from "../styles/components/utils/accordion"
import { moderateScale } from "./Responsive"

const Accordion = ({ children, title, state }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleItem = () => {
    setExpanded(!expanded)
  }

  const body = <View style={styles.accordBody}>{children}</View>

  const getStateColor = () => {
    switch (state) {
      case "ok":
        return <AntDesign name="checkcircleo" size={moderateScale(24)} color="green" />
      case "ko":
        return <Feather name="alert-triangle" size={moderateScale(24)} color="red" />
      case "unknown":
        return <AntDesign name="exclamationcircleo" size={moderateScale(24)} color="gray" />
    }
  }

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity
        style={styles.accordHeader}
        onPress={() => toggleItem()}
      >
        <Text style={styles.accordTitle}>
          {title}
        </Text>
        {getStateColor()}
        <Entypo
          name={expanded ? "chevron-small-up" : "chevron-small-down"}
          size={moderateScale(25)}
          color="black"
        />
      </TouchableOpacity>
      {expanded && body}
    </View>
  )
}

const styles = StyleSheet.create({
  accordBody: accordion.accordBody,
  accordContainer: accordion.accordContainer,
  accordHeader: accordion.accordHeader,
  accordTitle: accordion.accordTitle,
  accordBadge: accordion.accordBadge
})

export default Accordion
