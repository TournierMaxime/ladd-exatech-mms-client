import React, { useCallback, useState } from "react"
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
} from "react-native"
import form from "../../styles/components/utils/form"
import { Card } from "@rneui/themed"
import ToastConfig from "../../utils/ToastConfig"
import button from "../../styles/components/utils/button"
import { moderateScale } from "../../utils/Responsive"
import { ToastSuccess } from "../../utils/Toast"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { handleError, createTextInput, createFormData } from "../../utils/form"
import { Picker } from "@react-native-picker/picker"
import { createIntervention } from "../../redux/actions/interventions"
import moment from "moment"
import { isValidDateFormatFR } from "../../utils/regex"
import HeaderComponent from "../../components/Header"

const InterventionForm = ({ route }) => {
  const { useDiscord, discordInviteLink, ticketId, machineId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  // const errors = useSelector((state) => state.createIntervention.error)

  const handlePickerChange = useCallback((value, filterName) => {
    setData((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }, [])

  const [data, setData] = useState({
    mode: "",
    type: "",
    details: "",
    plannedInterventionDate: "",
    realInterventionDate: "",
    ticketId,
    machineId,
  })

  const modes = [
    {
      label: "Sélectionnez un mode",
      value: null,
    },
    {
      label: "A distance",
      value: "from distance",
    },
    {
      label: "Sur place",
      value: "on spot",
    },
  ]

  const handleCreate = async () => {
    try {
      if (moment(data.plannedInterventionDate, "DD/MM/YYYY").isBefore(moment())) {
        handleError(
          null,
          "La date d'intervention ne peut être inférieur à la date d'aujourd'hui."
        )
        return
      }
      const transformDateFormat = (date) => {
        return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD HH:mm:ss")
      }
      if (!isValidDateFormatFR(data.plannedInterventionDate)) {
        handleError(null, "La date d'intervention prévue n'est pas valide.")
        return
      }
      const formData = createFormData(
        {
          mode: data.mode,
          type: data.type,
          details: data.details,
          plannedInterventionDate: transformDateFormat(
            data.plannedInterventionDate
          ),
          ticketId,
          machineId,
        },
        [
          "mode",
          "type",
          "details",
          "plannedInterventionDate",
          "ticketId",
          "machineId",
        ]
      )
      const response = await dispatch(createIntervention(formData))
      if (response) {
        ToastSuccess("success", "Intervention créé avec succès", true)
        setTimeout(() => {
          if (useDiscord) {
            Linking.openURL(discordInviteLink)
          } else {
            navigation.navigate("OneTicket", {
              ticketId,
            })
          }
        }, 1000)
      } else {
        handleError(
          null,
          "Une erreur s'est produite lors de la création du formulaire"
        )
      }
    } catch (error) {
      handleError(
        error,
        "Une erreur s'est produite lors de la création du formulaire"
      )
    } finally {
      setData({
        mode: "",
        type: "",
        details: "",
        plannedInterventionDate: "",
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
      <Card containerStyle={{ position: "relative" }}>
        <Card.Title
          style={{ fontSize: moderateScale(20), textAlign: "center" }}
        >
          Formulaire d&apos;intervention
        </Card.Title>
        <View>
          <Text style={styles.formLabel}>Mode</Text>
          <Picker
            style={{ backgroundColor: "#f2f2f2" }}
            selectedValue={data.mode}
            onValueChange={(value) => handlePickerChange(value, "mode")}
          >
            {modes.map((item) => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
        <View>
          <Text style={styles.formLabel}>Type</Text>
          {createTextInput(
            data,
            setData,
            data.type,
            "Type",
            "type",
            true,
            false
          )}
        </View>
        <View>
          <Text style={styles.formLabel}>Description</Text>
          {createTextInput(
            data,
            setData,
            data.details,
            "Description",
            "details",
            true,
            true
          )}
        </View>
        <View>
          <Text style={styles.formLabel}>Intervention prévue</Text>
          {createTextInput(
            data,
            setData,
            data.plannedInterventionDate,
            "JJ/MM/AAAA",
            "plannedInterventionDate",
            true,
            false
          )}
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
        <ToastConfig bottom={moderateScale(0)} />
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  formLabel: form.formLabel,
  blueBtn: button.blueBtn,
  btnTxt: button.btnTxt,
})

export default InterventionForm
