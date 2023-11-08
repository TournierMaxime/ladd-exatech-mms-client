import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { ToastSuccess } from "../../utils/Toast"
import ToastConfig from "../../utils/ToastConfig"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { searchComments, createComment } from "../../redux/actions/comments"
import { searchTickets } from "../../redux/actions/tickets"
import { moderateScale } from "../../utils/Responsive"
import form from "../../styles/components/utils/form"
import button from "../../styles/components/utils/button"
import {
  handleError,
  createFormData,
  pickMedia,
  createTextInput,
  fileDisplay,
} from "../../utils/form"

const CreateComment = ({ ticketId, handleModal, machineId }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [data, setData] = useState({ text: "", file: [], ticketId })

  const handleCreate = async () => {
    try {
      const formData = createFormData(data, ["text", "ticketId"])
      const response = await dispatch(createComment(formData))

      if (response) {
        ToastSuccess("success", "Commentaire créé avec succès", true)
        setTimeout(async () => {
          navigation.navigate("OneTicket", { ticketId }), await handleModal()
        }, 1000)
        await dispatch(searchComments(ticketId, { page: 1 }))
        await dispatch(searchTickets(machineId, { page: 1 }))
      }
    } catch (error) {
      handleError(
        error,
        "Une erreur s'est produite lors de la création du commentaire"
      )
    }
  }

  return (
    <ScrollView style={{ marginTop: moderateScale(80) }}>
      <View
        style={{
          paddingHorizontal: moderateScale(15),
        }}
      >
        <View>
          <Text style={styles.formLabel}>Commentaire</Text>
          {createTextInput(
            data,
            setData,
            data.text,
            "Commentaire",
            "text",
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

          <TouchableOpacity
            onPress={() => pickMedia("document", data, setData)}
            style={[styles.blueBtn, { marginTop: moderateScale(10) }]}
          >
            <Text style={styles.btnTxt}>Ajouter des documents</Text>
          </TouchableOpacity>
          {fileDisplay(data, setData)}
        </View>
        <View style={{ marginTop: moderateScale(50) }}>
          <TouchableOpacity
            onPress={() => handleCreate()}
            style={[styles.blueBtn, { marginBottom: moderateScale(50) }]}
          >
            <Text style={styles.btnTxt}>Valider</Text>
          </TouchableOpacity>
        </View>
        <ToastConfig top={moderateScale(20)} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  formLabel: form.formLabel,
  blueBtn: button.blueBtn,
  btnTxt: button.btnTxt,
})

export default CreateComment
