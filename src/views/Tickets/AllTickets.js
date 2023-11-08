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
import { searchTickets, resetTickets } from "../../redux/actions/tickets"
import profil from "../../styles/components/utils/profil"
import badge from "../../styles/components/utils/badge"
import message from "../../styles/components/utils/message"
import { Entypo, FontAwesome } from "react-native-vector-icons"
import { moderateScale } from "../../utils/Responsive"
import { useNavigation } from "@react-navigation/native"
import NoDataFound from "../../utils/NoDataFound"
import useLoadMore from "../../utils/LoadMore"
import HeaderComponent from "../../components/Header"

const AllTickets = ({ route }) => {
  const { machineId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const data = useSelector((state) => state.searchTickets.data)
  const tickets = useSelector((state) => state.searchTickets.data.tickets)
  const [refreshing, setRefreshing] = useState(false)
  const { currentPage, loadMore } = useLoadMore(data.page, data.totalPages)
  const [allTickets, setAllTickets] = useState([])

  const status = (status) => {
    switch (status) {
      case "open":
        return <Text style={styles.open}>Ouvert</Text>
      case "closed":
        return <Text style={styles.closed}>Fermé</Text>
      case "in-progress":
        return <Text style={styles.inProgress}>En cours</Text>
    }
  }

  const renderItem = useCallback((item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OneTicket", { ticketId: item.ticketId, machineId })
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
                <Text>{item.title}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome
                  name="comment-o"
                  size={moderateScale(20)}
                  color="black"
                />
                <Text style={{ marginLeft: moderateScale(5) }}>
                  {nbOfComments(item.Comments)}
                </Text>
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
    await dispatch(searchTickets(machineId, { page: 1 }))
    setRefreshing(false)
  }, [dispatch, machineId])

  const nbOfComments = (data) => {
    if (data && data?.length > 0) {
      return data?.length
    } else return 0
  }

  useEffect(() => {
    const updateResults = async () => {
      if (tickets?.length > 0) {
        if (currentPage > 1) {
          setAllTickets((prevResults) => [...prevResults, ...tickets])
        } else {
          setAllTickets(tickets)
        }
      }
    }
    updateResults()
  }, [tickets])

  useEffect(() => {
    dispatch(searchTickets(machineId, { page: currentPage }))
  }, [dispatch, machineId, currentPage])

  useEffect(() => {
    return () => {
      dispatch(resetTickets())
    }
  }, [])

  return (
    <View style={styles.container}>
      <HeaderComponent backButton={true} />
      <FlatList
        data={allTickets}
        keyExtractor={(item) => item.ticketId.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
        style={styles.profilViewContainer}
        ListEmptyComponent={
          <NoDataFound message={"Aucun tickets sur cette machine"} />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          tickets?.length > 0 ? (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: moderateScale(25),
              }}
            >
              <Button
                title="Charger plus de tickets"
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
  open: badge.open,
  closed: badge.closed,
  inProgress: badge.inProgress,
  containerMessage: message.containerMessage,
  messageText: message.messageText,
})

export default AllTickets
