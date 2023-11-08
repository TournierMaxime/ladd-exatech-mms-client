import React, { Fragment, useState } from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Entypo } from "@expo/vector-icons"
import { moderateScale } from "./Responsive"
import ModalComponent from "./ModalComponent"
import CreateComment from "../views/Comments/CreateComment"

const CreateButton = ({ ticketId, machineId }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const handleModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <Fragment>
      <TouchableOpacity
        style={styles.createButtonContainer}
        onPress={() => handleModal()}
      >
        <View style={styles.createButton}>
          <Entypo name="new-message" size={moderateScale(25)} color="white" />
        </View>
      </TouchableOpacity>
      <ModalComponent
        visible={modalVisible}
        setVisible={setModalVisible}
        title={"Ajout d'un commentaire"}
        content={<CreateComment ticketId={ticketId} machineId={machineId} handleModal={handleModal} />}
      />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  createButtonContainer: {
    position: "absolute",
    bottom: moderateScale(70),
    right: moderateScale(15),
    zIndex: 1000
  },
  createButton: {
    backgroundColor: "rgb(33, 150, 243)",
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(30),
    alignItems: "center",
    justifyContent: "center",
  },
})

export default CreateButton
