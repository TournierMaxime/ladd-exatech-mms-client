import React from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native"
import {
  Entypo,
  Ionicons,
  FontAwesome5,
  AntDesign,
} from "react-native-vector-icons"
import profil from "../styles/components/utils/profil"
import button from "../styles/components/utils/button"
import { useNavigation } from "@react-navigation/native"
import { moderateScale } from "./Responsive"
import { useSelector, useDispatch } from "react-redux"
import { searchMachines, deleteMachine } from "../redux/actions/machines"
import HeaderComponent from "../components/Header"

const DotDetails = ({ route }) => {
  const { machineId, errorId } = route.params
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const machine = useSelector((state) => state.getOneMachine.data.machine)

  const handleDeleteMachine = async () => {
    await dispatch(deleteMachine(machineId))
    await dispatch(searchMachines({ page: 1 }))
    setTimeout(() => {
      navigation.navigate("Home")
    }, 1000)
  }

  const createTicket = () => {
    if (!errorId && machine?.state === "ok") return
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CreateTicket", {
            machineId,
            errorId,
          })
        }}
      >
        <View style={styles.profileSectionContainer}>
          <View style={styles.textIconContainer}>
            <Ionicons
              style={styles.icon}
              name="add"
              size={moderateScale(25)}
              color="black"
            />
            <Text style={{ fontSize: moderateScale(16) }}>Créer un ticket</Text>
          </View>
          <Entypo
            name="chevron-small-right"
            size={moderateScale(25)}
            color="black"
          />
        </View>
      </TouchableOpacity>
    )
  }

  const allTickets = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AllTickets", {
            machineId,
            errorId,
          })
        }}
      >
        <View style={styles.profileSectionContainer}>
          <View style={styles.textIconContainer}>
            <Entypo
              style={styles.icon}
              name="ticket"
              size={moderateScale(25)}
              color="black"
            />
            <Text style={{ fontSize: moderateScale(16) }}>Tickets</Text>
          </View>
          <Entypo
            name="chevron-small-right"
            size={moderateScale(25)}
            color="black"
          />
        </View>
      </TouchableOpacity>
    )
  }

  const faqCategory = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FAQCategory", {
            machineId
          })
        }}
      >
        <View style={styles.profileSectionContainer}>
          <View style={styles.textIconContainer}>
            <AntDesign
              style={styles.icon}
              name="message1"
              size={moderateScale(25)}
              color="black"
            />
            <Text style={{ fontSize: moderateScale(16) }}>F.A.Q</Text>
          </View>
          <Entypo
            name="chevron-small-right"
            size={moderateScale(25)}
            color="black"
          />
        </View>
      </TouchableOpacity>
    )
  }

    const allInterventions = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AllInterventions", {
            machineId
          })
        }}
      >
        <View style={styles.profileSectionContainer}>
          <View style={styles.textIconContainer}>
            <AntDesign
              style={styles.icon}
              name="customerservice"
              size={moderateScale(25)}
              color="black"
            />
            <Text style={{ fontSize: moderateScale(16) }}>Interventions</Text>
          </View>
          <Entypo
            name="chevron-small-right"
            size={moderateScale(25)}
            color="black"
          />
        </View>
      </TouchableOpacity>
    )
  }

  const alertDeleteMachine = async () => {
    return Alert.alert(
      "Suppression de la machine",
      "La suppression de la machine entrainera la perte définitive de toutes les données liés à celle-ci.\n\nÊtes vous sur de vouloir supprimer cette machine ?",
      [
        {
          text: "Confirmer",
          onPress: () => handleDeleteMachine(),
        },
        {
          text: "Annuler",
          cancelable: true,
        },
      ]
    )
  }

  const deleteMachineButton = () => {
    return (
      <TouchableOpacity onPress={() => alertDeleteMachine()}>
        <View style={styles.profileSectionContainer}>
          <View style={styles.textIconContainer}>
            <FontAwesome5
              style={styles.icon}
              name="trash-alt"
              size={moderateScale(22)}
              color="black"
            />
            <Text style={{ fontSize: moderateScale(16), color: "red" }}>
              Supprimer Machine
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderComponent backButton={true} />
      <View style={styles.profilViewContainer}>{createTicket()}</View>
      <View style={styles.profilViewContainer}>{allTickets()}</View>
      <View style={styles.profilViewContainer}>{faqCategory()}</View>
      <View style={styles.profilViewContainer}>{allInterventions()}</View>
      <View style={styles.profilViewContainer}>{deleteMachineButton()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  logoutButton: button.logoutButton,
  profileSectionContainer: profil.profileSectionContainer,
  icon: profil.icon,
  textIconContainer: profil.textIconContainer,
  profilViewContainer: profil.profilViewContainer,
})

export default DotDetails
