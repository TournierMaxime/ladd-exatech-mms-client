import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Linking
} from "react-native"
import form from "../../styles/components/utils/form"
import { Card } from "@rneui/themed"
import { ToastSuccess } from "../../utils/Toast"
import ToastConfig from "../../utils/ToastConfig"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { createTicket } from "../../redux/actions/tickets"
import { moderateScale } from "../../utils/Responsive"
import button from "../../styles/components/utils/button"
import {
  handleError,
  createFormData,
  pickMedia,
  createTextInput,
  fileDisplay,
} from "../../utils/form"
import HeaderComponent from "../../components/Header"

const CreateTicket = ({ route }) => {
  const { machineId, errorId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [data, setData] = useState({
    title: "",
    description: "",
    file: [],
    machineId,
    errorId,
    provider: "",
    useDiscord: false,
    isInterventionNeeded: false,
  })

  const handleCreate = async () => {
    try {
      data.provider = data.useDiscord ? "Discord" : "MMS"
      const formData = createFormData(data, [
        "title",
        "description",
        "machineId",
        "errorId",
        "provider",
      ])
      const response = await dispatch(createTicket(formData))
      if (response) {
        ToastSuccess("success", "Ticket créé avec succès", true)
        setTimeout(() => {
          if (data.useDiscord && !data.isInterventionNeeded) {
            const discordInviteLink = response.data.discordInviteLink
            Linking.openURL(discordInviteLink)
          } else if (data.isInterventionNeeded && !data.useDiscord) {
            navigation.navigate("InterventionForm", { ticketId: response.data.ticketId, useDiscord: data.useDiscord, machineId })
          } else if (data.useDiscord && data.isInterventionNeeded) {
            navigation.navigate("InterventionForm", { ticketId: response.data.ticketId, useDiscord: data.useDiscord, discordInviteLink: response.data.discordInviteLink, machineId })
          } else {
            navigation.navigate("OneTicket", {
              ticketId: response.data.ticketId,
            })
          }
        }, 1000)
      } else {
        handleError(
          null,
          "Une erreur s'est produite lors de la création du ticket"
        )
      }
    } catch (error) {
      handleError(
        error,
        "Une erreur s'est produite lors de la création du ticket"
      )
    } finally {
      setData({
        title: "",
        description: "",
        file: [],
        machineId,
        errorId,
        provider: "",
      })
    }
  }

  return (
    <ScrollView
      style={{
        width: "100%",
      }}
    >
      <HeaderComponent backButton={true} />
      <Card containerStyle={styles.cardContainer}>
        <Card.Title
          style={{ fontSize: moderateScale(20), textAlign: "center" }}
        >
          Création du ticket
        </Card.Title>
        <View>
          <Text style={styles.formLabel}>Titre</Text>
          {createTextInput(
            data,
            setData,
            data.title,
            "Titre",
            "title",
            true,
            false
          )}
        </View>
        <View>
          <Text style={styles.formLabel}>Description</Text>
          {createTextInput(
            data,
            setData,
            data.description,
            "Description",
            "description",
            true,
            true
          )}
        </View>
        <View>
          <TouchableOpacity
            onPress={() => pickMedia("image", data, setData)}
            style={styles.blueBtn}
          >
            <Text style={styles.btnTxt}>Ajouter des images</Text>
          </TouchableOpacity>
          {fileDisplay(data, setData)}
        </View>
        <View style={{ marginVertical: moderateScale(15) }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              marginBottom: moderateScale(10),
            }}
          >
            Conversation sur Discord
          </Text>
          <Switch
            value={data.useDiscord}
            onValueChange={(value) => setData({ ...data, useDiscord: value })}
          />
        </View>
        <View style={{ marginVertical: moderateScale(15) }}>
          <Text
            style={{
              fontSize: moderateScale(16),
              marginBottom: moderateScale(10),
            }}
          >
            Besoin d&apos;une intervention ?
          </Text>
          <Text
            style={{
              fontSize: moderateScale(12),
              marginBottom: moderateScale(10),
            }}
          >
            (service facturé)
          </Text>
          <Switch
            value={data.isInterventionNeeded}
            onValueChange={(value) =>
              setData({ ...data, isInterventionNeeded: value })
            }
          />
        </View>
        <Card.Divider />
        <View style={{ marginTop: moderateScale(10) }}>
          <TouchableOpacity
            onPress={() => handleCreate()}
            style={styles.blueBtn}
          >
            <Text style={styles.btnTxt}>Valider</Text>
          </TouchableOpacity>
        </View>
      </Card>
      <ToastConfig top={moderateScale(0)} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  formLabel: form.formLabel,
  blueBtn: button.blueBtn,
  btnTxt: button.btnTxt,
})

export default CreateTicket
