import React, { useState, useEffect, useCallback } from "react"
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native"
import moment from "moment/moment"
import {
  searchMachinesStatesHistory,
  resetMachinesStatesHistory,
} from "../../../redux/actions/machinesStatesHistory"
import { useDispatch, useSelector } from "react-redux"
import form from "../../../styles/components/utils/form"
import Accordion from "../../../utils/Accordion"
import message from "../../../styles/components/utils/message"
import States from "../States"
import ModalComponent from "../../../utils/ModalComponent"
import Filters from "./Filters"
import { moderateScale } from "../../../utils/Responsive"
import button from "../../../styles/components/utils/button"
import NoDataFound from '../../../utils/NoDataFound'

const HistoryRoute = ({ machine }) => {
  const dispatch = useDispatch()
  // States
  const [isLoading, setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [isFilterApplied, setIsFilterApplied] = useState(false)

  // Selectors
  const machinesStatesHistory = useSelector(
    (state) => state.searchMachinesStatesHistory.data.machinesStatesHistory
  )

  const [filters, setFilters] = useState({
    state: null,
    startDate: null,
    endDate: null,
    size: null,
  })

  // Fonctions
  const handleModal = useCallback(() => {
    setModalVisible((prevState) => !prevState)
  }, [])

  const renderItem = useCallback((item, index) => (
    <Accordion
      title={moment(item.createdAt).format("DD/MM/YYYY à HH:mm:ss")}
      state={item.state}
      key={index}
    >
      <View>
        <View>
          <Text style={styles.formLabel}>ID</Text>
          <TextInput
            editable={false}
            style={styles.formInput}
            placeholder="ID"
            defaultValue={item?.machineStateHistoryId}
          />
        </View>
        <States item={item} machine={machine} />
        <View>
          <Text style={styles.formLabel}>Création</Text>
          <TextInput
            editable={false}
            style={styles.formInput}
            placeholder="Création"
            defaultValue={moment(machine?.createdAt).format(
              "DD/MM/YYYY à HH:mm:ss"
            )}
          />
        </View>
        <View>
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
      </View>
    </Accordion>
  ), [])

  // Datas
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        if (isFilterApplied === true) {
          await dispatch(
            searchMachinesStatesHistory(machine?.machineId, {
              ...filters,
            })
          )
        } else {
          await dispatch(searchMachinesStatesHistory(machine?.machineId))
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dispatch, filters, isFilterApplied])

  useEffect(() => {
    return () => {
      dispatch(resetMachinesStatesHistory())
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: moderateScale(15) }}>
        <TouchableOpacity onPress={handleModal} style={styles.blueBtn}>
          <Text style={styles.btnTxt}>Filtrer</Text>
        </TouchableOpacity>
      </View>
      <ModalComponent
        visible={modalVisible}
        setVisible={setModalVisible}
        title={"Filtres historiques"}
        content={
          <Filters
            machine={machine}
            handleModal={handleModal}
            setFilters={setFilters}
            filters={filters}
            setIsFilterApplied={setIsFilterApplied}
          />
        }
      />
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: moderateScale(150),
        }}
        data={machinesStatesHistory}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={() => <NoDataFound message={'Aucun historique sur cette machine'} />}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
        onEndReachedThreshold={0.5}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  formInput: form.formInput,
  formLabel: form.formLabel,
  containerMessage: message.containerMessage,
  messageText: message.messageText,
  blueBtn: button.blueBtn,
  btnTxt: button.btnTxt,
})

export default HistoryRoute
