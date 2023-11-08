import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import header from "../styles/components/layout/header"
import { Ionicons } from "@expo/vector-icons"
import { Header } from "@rneui/themed"
import { moderateScale } from '../utils/Responsive'
import relaseApk from "../../android/app/release/output-metadata.json"

const HeaderComponent = ({ backButton }) => {
  const navigation = useNavigation()
  const apk = relaseApk.elements.find((item) => item)

  const goBackButton = () => {
    return (
      <Ionicons
        style={[styles.arrowIcon, { padding: moderateScale(10) }]}
        name="arrow-back"
        size={moderateScale(25)}
        color="black"
      />
    )
  }

  return (
    <Header
      style={styles.header}
      leftComponent={
        backButton === true ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View>{goBackButton()}</View>
          </TouchableOpacity>
        ) : null
      }
      centerComponent={{ text: `MMS v.${apk.versionName}`, style: styles.title }}
    />
  )
}

const styles = StyleSheet.create({
  header: header.header,
  title: header.title,
  arrowIcon: header.arrowIcon,
})

export default HeaderComponent
