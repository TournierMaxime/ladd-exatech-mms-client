import React, { useEffect, useState, useCallback } from "react"
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Button
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { searchInterventions, resetInterventions } from "../../redux/actions/interventions"
import profil from "../../styles/components/utils/profil"
import badge from "../../styles/components/utils/badge"
import message from "../../styles/components/utils/message"
import { Entypo } from "react-native-vector-icons"
import { moderateScale } from "../../utils/Responsive"
import { useNavigation } from "@react-navigation/native"
import NoDataFound from "../../utils/NoDataFound"
import useLoadMore from "../../utils/LoadMore"
import HeaderComponent from "../../components/Header"

const AllInterventions = ({ route }) => {
  const { machineId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const data = useSelector((state) => state.searchInterventions.data)
  const interventions = useSelector((state) => state.searchInterventions.data.interventions)
  const [refreshing, setRefreshing] = useState(false)
  const { currentPage, loadMore } = useLoadMore(data.page, data.totalPages)
  const [allInterventions, setAllInterventions] = useState([])

  const status = (status) => {
    switch (status) {
      case "new":
        return <Text style={styles.new}>Nouveau</Text>
      case "validate":
        return <Text style={styles.validate}>Validé</Text>
      case "ended":
        return <Text style={styles.ended}>Terminé</Text>
    }
  }

    const renderItem = useCallback((item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OneIntervention", { interventionId: item.interventionId })
        }
      >
        <View style={styles.profileSectionContainer} key={index}>
          <View style={styles.textIconContainer}>
            <Entypo
              style={styles.icon}
              name="ticket"
              size={moderateScale(25)}
              color="black"
            />
            <View>
              <View>
                <Text>{item.type}</Text>
              </View>
            </View>
          </View>
          {status(item.status)}
        </View>
      </TouchableOpacity>
    )
  }, [])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await dispatch(searchInterventions(machineId, { page: 1 }))
    setRefreshing(false)
  }, [dispatch, machineId])

  useEffect(() => {
    const updateResults = async () => {
      if (interventions?.length > 0) {
        if (currentPage > 1) {
          setAllInterventions((prevResults) => [...prevResults, ...interventions])
        } else {
          setAllInterventions(interventions)
        }
      }
    }
    updateResults()
  }, [interventions])

  useEffect(() => {
    dispatch(searchInterventions(machineId, { page: currentPage }))
  }, [dispatch, machineId, currentPage])

  useEffect(() => {
    return () => {
      dispatch(resetInterventions())
    }
  }, [])

  return (
    <View style={styles.container}>
      <HeaderComponent backButton={true} />
      <FlatList
        data={allInterventions}
        keyExtractor={(item) => item.interventionId.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
        style={styles.profilViewContainer}
        ListEmptyComponent={
          <NoDataFound message={"Aucune interventions sur cette machine"} />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          interventions?.length > 0 ? (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: moderateScale(25),
              }}
            >
              <Button
                title="Charger plus d'interventions"
                onPress={loadMore}
                disabled={currentPage >= data.totalPages}
              />
            </View>
          ) : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef"
  },
  profileSectionContainer: profil.profileSectionContainer,
  icon: profil.icon,
  textIconContainer: profil.textIconContainer,
  profilViewContainer: profil.profilViewContainer,
  new: badge.nouveau,
  validate: badge.validate,
  ended: badge.ended,
  containerMessage: message.containerMessage,
  messageText: message.messageText,
})

export default AllInterventions
