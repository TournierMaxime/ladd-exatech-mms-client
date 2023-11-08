import React, { useState } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native"
import { useDispatch } from "react-redux"
import addMachine from "../../styles/pages/addMachine"
import form from "../../styles/components/utils/form"
import { Card } from "@rneui/themed"
import { createMachine, searchMachines } from "../../redux/actions/machines"
import { useNavigation } from "@react-navigation/native"
import { ToastSuccess, ToastError } from "../../utils/Toast"
import ToastConfig from "../../utils/ToastConfig"
import { moderateScale } from "../../utils/Responsive"
import button from '../../styles/components/utils/button'
import { createTextInput } from "../../utils/form"
import HeaderComponent from "../../components/Header"

const CreateMachine = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [data, setData] = useState({type: '', code: ''})

  const handleCreate = async () => {
    if (!data.type || !data.code) {
      ToastError("error", "Tous les champs sont obligatoires", true)
      return
    }
    try {
      await dispatch(createMachine(data))
      ToastSuccess("success", "Machine ajoutée avec succès", true)
      await dispatch(searchMachines())
      setTimeout(() => {
        navigation.navigate("Home")
      }, 1000)
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError("error", error.response.data.errMsg, true)
    }
  }

  return (
    <View style={styles.container}>
      <HeaderComponent backButton={true} />
      <Card>
        <Card.Title style={{ fontSize: moderateScale(20) }}>
          Ajouter une Machine
        </Card.Title>
        <Card.Divider />
        <View>
          {createTextInput(data, setData, data.type, 'Type', 'type', true, false)}
        </View>
        <View>
          {createTextInput(data, setData, data.code, 'Code', 'code', true, false)}
        </View>
        <View>
          <TouchableOpacity
            onPress={handleCreate}
            style={styles.blueBtn}
          >
            <Text
              style={styles.btnTxt}
            >
              Confirmer
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
      <ToastConfig top={moderateScale(-40)} />
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: addMachine.container,
  formInput: form.formInput,
  dropdownBtn: form.dropdownBtn,
  dropdownBtnTxt: form.dropdownBtnTxt,
  dropdown: form.dropdown,
  dropdownRow: form.dropdownRow,
  dropdownRowTxt: form.dropdownBtnTxt,
  blueBtn: button.blueBtn,
  btnTxt: button.btnTxt
})

export default CreateMachine
