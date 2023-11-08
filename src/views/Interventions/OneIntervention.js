import React, { useEffect } from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"
import { moderateScale } from "../../utils/Responsive"
import { useDispatch, useSelector } from "react-redux"
import { getOneIntervention } from "../../redux/actions/interventions"
import HeaderComponent from "../../components/Header"
import { Card } from "@rneui/themed"
import oneMachine from "../../styles/pages/oneMachine"
import InterventionDetails from "../../components/Interventions/InterventionDetails"

const OneIntervention = ({ route }) => {
  const { interventionId } = route.params
  const dispatch = useDispatch()
  const intervention = useSelector(
    (state) => state.getOneIntervention.data.intervention
  )
  const isLoading = useSelector((state) => state.getOneIntervention.loading)

  useEffect(() => {
    dispatch(getOneIntervention(interventionId))
  }, [dispatch, interventionId])

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
              {intervention?.type}
            </Card.Title>
          </View>
          <Card.Divider />
          <InterventionDetails intervention={intervention} />
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

export default OneIntervention
