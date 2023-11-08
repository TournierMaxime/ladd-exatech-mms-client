import React, { useEffect } from "react"
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native"
import { getOneMachine } from "../../redux/actions/machines"
import { useDispatch, useSelector } from "react-redux"
import oneMachine from "../../styles/pages/oneMachine"
import { Card } from "@rneui/themed"
import TabComponent from "../../components/Machines/TabComponent"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { moderateScale } from "../../utils/Responsive"
import HeaderComponent from "../../components/Header"

const OneMachine = ({ route }) => {
  const { machineId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isLoading = useSelector((state) => state.getOneMachine.loading)
  const machine = useSelector((state) => state.getOneMachine.data.machine)
  const errorId = machine?.Error?.errorId

  const navigateToDetails = () => {
    navigation.navigate("DotDetails", {
      machineId,
      errorId,
      machine
    })
  }

  useEffect(() => {
    dispatch(getOneMachine(machineId))
  }, [dispatch, machineId])

  return (
    <View style={styles.container}>
      <HeaderComponent backButton={true} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Card containerStyle={styles.cardContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Card.Title
              style={{ fontSize: moderateScale(20), textAlign: "center" }}
            >
              {machine?.type}
            </Card.Title>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: moderateScale(0),
                top: moderateScale(-5),
              }}
              onPress={navigateToDetails}
            >
              <Entypo
                style={{ padding: moderateScale(10) }}
                name="dots-three-vertical"
                size={moderateScale(25)}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <Card.Divider />
          <TabComponent machine={machine} />
        </Card>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: oneMachine.container,
  cardContainer: oneMachine.cardContainer,
  text: oneMachine.text,
})

export default OneMachine
