import React from "react"
import { StyleSheet, View, Text } from "react-native"
import SliceString from "./SliceString"
import { Feather, AntDesign } from "@expo/vector-icons"
import table from '../styles/components/utils/table'
import { moderateScale } from "./Responsive"

const TableComponent = ({ headerData, rowData }) => {
  const renderCell = (data, index) => {
    switch (index) {
      case 0:
        return (
          <View style={{ width: "25%" }} key={index}>
            <SliceString string={data} length={7} />
          </View>
        )
      case 1:
        return (
          <View style={{ width: "25%" }} key={index}>
            <SliceString string={data} length={10} />
          </View>
        )
      case 2:
        return (
          <View style={{ width: "18%", alignItems: 'center' }} key={index}>
            {data === "ko" ? (
              <Feather name="alert-triangle" size={moderateScale(24)} color="red" />
            ) : data === "ok" ? (
              <AntDesign name="checkcircleo" size={moderateScale(24)} color="green" />
            ) : data === "unknown" ? (
              <AntDesign name="exclamationcircleo" size={moderateScale(24)} color="gray" />
            ) : null}
          </View>
        )
      case 3:
        return (
          <View style={{ width: "45%", alignItems: 'center' }} key={index}>
            <Text>{data}</Text>
          </View>
        )
      default:
        return (
          <View style={{ width: "25%" }} key={index}>
            <Text>{data}</Text>
          </View>
        )
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: moderateScale(15), width: '100%' }}>
        {headerData.map((header, index) => (
          <View style={{ width: "27%" }} key={index}>
            <Text style={styles.header}>{header}</Text>
          </View>
        ))}
      </View>
      <View style={styles.rowData}>
        {rowData.map((row, index) => (
          <View
            key={index}
            style={
              index % 2 === 0
                ? styles.row
                : { ...styles.row, backgroundColor: "#F9F9F9" }
            }
          >
            {row.map((cell, idx) => renderCell(cell, idx))}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: table.container,
  row: table.row,
  rowData: table.rowData,
  header: table.header
})

export default TableComponent
