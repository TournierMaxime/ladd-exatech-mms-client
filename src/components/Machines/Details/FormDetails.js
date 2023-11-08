import React, { useState, useCallback } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import form from "../../../styles/components/utils/form"
import { ToastSuccess, ToastError } from "../../../utils/Toast"
import { updateMachine, searchMachines } from "../../../redux/actions/machines"
import { useDispatch } from "react-redux"
import moment from "moment/moment"
import { moderateScale } from "../../../utils/Responsive"
import button from "../../../styles/components/utils/button"

const FormDetails = ({ machine }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    type: machine?.type,
    code: machine?.code
  })

  const handleUpdate = useCallback(async () => {
    try {
      await dispatch(updateMachine(machine?.machineId, data)).then(() => {
        dispatch(searchMachines({ page: 1 }))
        ToastSuccess("success", "Modifié avec succès", true)
      })
    } catch (error) {
      console.log(error.response.data.errMsg)
      ToastError("error", error.response.data.errMsg, true)
    }
  }, [dispatch, data])

  return (
    <View style={{ marginBottom: moderateScale(50) }}>
      <View>
        <Text style={styles.formLabel}>ID</Text>
        <TextInput
          editable={false}
          style={styles.formInput}
          placeholder="ID"
          defaultValue={machine?.machineId}
        />
      </View>
      <View>
        <Text style={styles.formLabel}>Type</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Type"
          onChangeText={(text) => setData({ ...data, type: text })}
          defaultValue={machine?.type}
        />
      </View>
      <View>
        <Text style={styles.formLabel}>Code</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Code"
          onChangeText={(text) => setData({ ...data, code: text })}
          defaultValue={machine?.code}
        />
      </View>
      <View>
        <Text style={styles.formLabel}>Etat</Text>
        <View>
          <TextInput
            style={styles.formInput}
            editable={false}
            placeholder="Etat"
            defaultValue={machine?.state}
          />
        </View>
      </View>
      <View style={{ marginTop: moderateScale(10) }}>
        <Text style={styles.formLabel}>Mis à jour</Text>
        <TextInput
          editable={false}
          style={styles.formInput}
          placeholder="Mis à jour"
          defaultValue={moment(machine?.updatedAt).format(
            "DD/MM/YYYY à HH:mm:ss"
          )}
        />
      </View>
      <View style={{ paddingBottom: moderateScale(100) }}>
        <TouchableOpacity onPress={() => handleUpdate()} style={styles.blueBtn}>
          <Text style={styles.btnTxt}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formInput: form.formInput,
  formLabel: form.formLabel,
  dropdownBtn: form.dropdownBtn,
  dropdownBtnTxt: form.dropdownBtnTxt,
  dropdown: form.dropdown,
  dropdownRow: form.dropdownRow,
  dropdownRowTxt: form.dropdownBtnTxt,
  blueBtn: button.blueBtn,
  btnTxt: button.btnTxt,
})

export default FormDetails
