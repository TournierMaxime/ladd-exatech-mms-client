import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import form from "../../styles/components/utils/form"
import { moderateScale } from "../../utils/Responsive"
import button from "../../styles/components/utils/button"
import moment from "moment"
import Message from "../../utils/Message"
import ModalComponent from "../../utils/ModalComponent"

const InterventionDetails = ({ intervention }) => {
  const [visible, setVisible] = useState(false)

  const handleModal = () => {
    setVisible(!visible)
  }

  const mode = (data) => {
    switch (data) {
      case "from distance":
        return "A distance"
      case "on spot":
        return "Sur place"
    }
  }

  const status = (data) => {
    switch (data) {
      case "new":
        return (
          <Message
            message={
              "Votre demande d'intervention a bien été prise en compte. Elle doit maintenant être validée par l'administration."
            }
            priority={"info"}
          />
        )
      case "validate":
        return (
          <Message
            message={`Votre demande d'intervention a bien été confirmée. L'intervention aura lieu le ${moment(
              intervention?.realInterventionDate
            ).format("DD/MM/YYYY à HH:mm")}.`}
            priority={"success"}
          />
        )
      case "ended":
        return (
          <Message
            message={
              "L'intervention est maintenant terminée. Vous pouvez consulter le compte rendu."
            }
            priority={"success"}
          />
        )
    }
  }

  const result = (data) => {
    if (intervention?.result === null) return

    switch (data) {
      case "ok":
        return (
          <View
            style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
          >
            <View>
              <Text style={styles.formLabel}>Résultat</Text>
              <TextInput
                editable={false}
                style={styles.formInput}
                placeholder="Résultat"
                defaultValue={"OK"}
              />
            </View>
            <View>
              <Text style={styles.formLabel}>Commentaire</Text>
              <TextInput
                editable={false}
                multiline
                style={styles.formTextArea}
                placeholder="Commentaire"
                defaultValue={intervention?.resultComment}
              />
            </View>
            <View>
              <Text style={styles.formLabel}>
                Temps d&apos;intervention H/h
              </Text>
              <TextInput
                editable={false}
                style={styles.formInput}
                placeholder="Temps d'intervention"
                defaultValue={intervention?.interventionTime?.toString()}
              />
            </View>
          </View>
        )
      case "ko":
        return (
          <View
            style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
          >
            <View>
              <Text style={styles.formLabel}>Résultat</Text>
              <TextInput
                editable={false}
                style={styles.formInput}
                placeholder="Résultat"
                defaultValue={"KO"}
              />
            </View>
            <View>
              <Text style={styles.formLabel}>Commentaire</Text>
              <TextInput
                editable={false}
                multiline
                style={styles.formTextArea}
                placeholder="Commentaire"
                defaultValue={intervention?.resultComment}
              />
            </View>
            <View>
              <Text style={styles.formLabel}>
                Temps d&apos;intervention H/h
              </Text>
              <TextInput
                editable={false}
                style={styles.formInput}
                placeholder="Temps d'intervention"
                defaultValue={intervention?.interventionTime?.toString()}
              />
            </View>
          </View>
        )
    }
  }

  return (
    <ScrollView style={{ marginBottom: moderateScale(250) }}>
      {status(intervention?.status)}
      {intervention?.result !== null ? (
        <TouchableOpacity
          onPress={handleModal}
          style={[styles.blueBtn, { marginBottom: moderateScale(15) }]}
        >
          <Text style={styles.btnTxt}>Consulter</Text>
        </TouchableOpacity>
      ) : null}
      <ModalComponent
        visible={visible}
        setVisible={setVisible}
        title={"Compte rendu"}
        content={result(intervention?.result)}
      />
      <View>
        <Text style={styles.formLabel}>ID</Text>
        <TextInput
          editable={false}
          style={styles.formInput}
          placeholder="ID"
          defaultValue={intervention?.interventionId}
        />
      </View>
      <View>
        <Text style={styles.formLabel}>Type</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Type"
          onChangeText={(text) => setData({ ...data, type: text })}
          defaultValue={intervention?.type}
          editable={false}
        />
      </View>
      <View>
        <Text style={styles.formLabel}>Mode</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Mode"
          onChangeText={(text) => setData({ ...data, mode: text })}
          defaultValue={mode(intervention?.mode)}
          editable={false}
        />
      </View>
      <View>
        <Text style={styles.formLabel}>Détails</Text>
        <TextInput
          style={styles.formTextArea}
          placeholder="Détails"
          onChangeText={(text) => setData({ ...data, details: text })}
          defaultValue={intervention?.details}
          editable={false}
          multiline
        />
      </View>
      <View>
        <Text style={styles.formLabel}>Rdv planifié</Text>
        <TextInput
          style={styles.formInput}
          placeholder="Rdv planifié"
          onChangeText={(text) =>
            setData({ ...data, plannedInterventionDate: text })
          }
          defaultValue={moment(intervention?.plannedInterventionDate).format(
            "DD/MM/YYYY à HH:mm"
          )}
          editable={false}
        />
      </View>
      {intervention?.status === "new" ? null : (
        <View>
          <Text style={styles.formLabel}>Rdv réel</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Rdv réel"
            onChangeText={(text) =>
              setData({ ...data, realInterventionDate: text })
            }
            defaultValue={moment(intervention?.realInterventionDate).format(
              "DD/MM/YYYY à HH:mm"
            )}
            editable={false}
          />
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  formInput: form.formInput,
  formLabel: form.formLabel,
  formTextArea: form.formTextArea,
  dropdownBtn: form.dropdownBtn,
  dropdownBtnTxt: form.dropdownBtnTxt,
  dropdown: form.dropdown,
  dropdownRow: form.dropdownRow,
  dropdownRowTxt: form.dropdownBtnTxt,
  blueBtn: button.blueBtn,
  btnTxt: button.btnTxt,
})

export default InterventionDetails
