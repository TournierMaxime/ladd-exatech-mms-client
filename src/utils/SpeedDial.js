import React, { useState } from "react"
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import speedDial from '../styles/components/utils/speedDial'
import { moderateScale } from "./Responsive"

const FabButton = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("CreateMachine")}
      style={[styles.fabButton, styles.shadow]}
    >
      <Text style={styles.text}>
        <Ionicons name="add" size={moderateScale(36)} />
      </Text>
    </TouchableOpacity>
  )
}

const SpeedFabView = () => {
  const navigation = useNavigation()
  const [showSpeedDial, setSpeedDial] = useState(null)
  const openSpeedDial = () => setSpeedDial(!showSpeedDial)

  return (
    <View style={styles.container}>
      {showSpeedDial ? (
        <View style={styles.speedView}>
          <TouchableOpacity>
            <Button onPress={() => navigation.navigate("CreateMachine")} title="Ajouter"></Button>
          </TouchableOpacity>
        </View>
      ) : null}
      <FabButton onPress={() => openSpeedDial()} />
    </View>
  )
}

export default SpeedFabView

const styles = StyleSheet.create({
  container: speedDial.container,
  fabButton: speedDial.fabButton,
  shadow: speedDial.shadow,
  text: speedDial.text,
  speedView: speedDial.speedView
})
