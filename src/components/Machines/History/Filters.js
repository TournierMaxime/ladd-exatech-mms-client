import React, { useState, useCallback } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native"
import form from "../../../styles/components/utils/form"
import { Picker } from "@react-native-picker/picker"
import CalendarPicker from "react-native-calendar-picker"
import moment from "moment"
import { moderateScale } from "../../../utils/Responsive"
import button from "../../../styles/components/utils/button"

const Filters = ({ handleModal, setFilters, setIsFilterApplied }) => {
  const states = [
    {
      label: "Sélectionnez un état",
      value: null,
    },
    {
      label: "OK",
      value: "ok",
    },
    {
      label: "KO",
      value: "ko",
    },
    {
      label: "Inconnu",
      value: "unknown",
    },
  ]
  const sizes = [
    {
      label: "Sélectionnez un nombre de résultats",
      value: null,
    },
    {
      label: "50",
      value: "50",
    },
    {
      label: "100",
      value: "100",
    },
    {
      label: "250",
      value: "250",
    },
    {
      label: "500",
      value: "500",
    },
  ]

  const [tempFilters, setTempFilters] = useState({})

  const handlePickerChange = useCallback((value, filterName) => {
    setTempFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }, [])

  const handleDateChange = useCallback(
    (date, type) => {
      if (!date) return
      const selectedDate = date.format("YYYY-MM-DD")

      setTempFilters((prev) => {
        if (
          (type === "START_DATE" && selectedDate === prev.startDate) ||
          (type === "END_DATE" && selectedDate === prev.endDate)
        ) {
          return prev
        }

        let updatedDates = { ...prev }

        if (type === "START_DATE") {
          if (moment(selectedDate).isBefore(moment(prev.endDate))) {
            updatedDates = {
              ...prev,
              startDate: selectedDate,
            }
          }
        }

        if (type === "END_DATE") {
          if (moment(selectedDate).isAfter(moment(prev.startDate))) {
            updatedDates = {
              ...prev,
              endDate: selectedDate,
            }
          }
        }
        return updatedDates
      })
    },
    [setTempFilters]
  )

  const handleApplyFilters = useCallback(async () => {
    try {
      setIsFilterApplied(true)
      await handleModal()
      setFilters(tempFilters)
    } catch (error) {
      console.log(error)
    }
    setTempFilters({})
  }, [setIsFilterApplied, handleModal, setFilters, tempFilters])

  const resetFilters = useCallback(async () => {
    setIsFilterApplied(false)
    await handleModal()
    setTempFilters({})
  }, [setIsFilterApplied, handleModal])

  return (
    <ScrollView>
      <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
        <View style={styles.box}>
          <Text style={styles.formLabel}>Etat</Text>
          <View>
            <Picker
              style={{ backgroundColor: "#f2f2f2" }}
              selectedValue={tempFilters.state}
              onValueChange={(value) => handlePickerChange(value, "state")}
            >
              {states.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.box}>
            <Text style={styles.formLabel}>Nombre de résultats</Text>
            <Picker
              style={{ backgroundColor: "#f2f2f2" }}
              selectedValue={tempFilters.size}
              onValueChange={(value) => handlePickerChange(value, "size")}
            >
              {sizes.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.box}>
            <Text style={styles.formLabel}>
              Sélectionnez un intervalle de date
            </Text>
            <CalendarPicker
              months={[
                "Jan",
                "Fév",
                "Mars",
                "Avr",
                "Mai",
                "Jui",
                "Juil",
                "Août",
                "Sep",
                "Oct",
                "Nov",
                "Déc",
              ]}
              weekdays={["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]}
              startFromMonday={true}
              allowRangeSelection={true}
              selectedStartDate={
                tempFilters.startDate ? moment(tempFilters.startDate) : null
              }
              selectedEndDate={
                tempFilters.endDate ? moment(tempFilters.endDate) : null
              }
              onDateChange={handleDateChange}
              previousTitle="Précédent"
              nextTitle="Suivant"
            />
          </View>
        </View>
        <View style={{ marginTop: moderateScale(15) }}>
          <TouchableOpacity
            onPress={() => handleApplyFilters()}
            style={styles.blueBtn}
          >
            <Text style={styles.btnTxt}>Appliquer</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: moderateScale(50),
            paddingBottom: moderateScale(50),
          }}
        >
          <TouchableOpacity
            onPress={resetFilters}
            style={styles.blueBtn}
          >
            <Text style={styles.btnTxt}>Rénitialiser</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  box: form.box,
})

export default Filters
