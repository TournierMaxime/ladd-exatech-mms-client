import React from "react"
import { ScrollView, View } from "react-native"
import ToastConfig from "../../../utils/ToastConfig"
import FormDetails from "./FormDetails"
import { moderateScale } from '../../../utils/Responsive'

const DetailsRoute = ({ machine }) => {
  return (
    <View style={{ flex: 1, height: "100%" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <FormDetails machine={machine} />
      </ScrollView>
      <ToastConfig top={moderateScale(-100)} />
    </View>
  )
}
 
export default DetailsRoute
