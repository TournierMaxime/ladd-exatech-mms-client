import React, { useEffect, useCallback } from "react"
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { moderateScale } from "../../utils/Responsive"
import { useDispatch, useSelector } from "react-redux"
import { searchFAQ } from "../../redux/actions/faq"
import { useNavigation } from "@react-navigation/native"
import { Entypo } from "react-native-vector-icons"
import profil from "../../styles/components/utils/profil"
import HeaderComponent from "../../components/Header"

const FAQ = ({ route }) => {
  const { machineId, faqCategoryId } = route.params
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const faq = useSelector((state) => state.searchFAQ.data.faq)

  const renderItem = useCallback((item, index) => {
    if (item.faqCategoryId !== faqCategoryId) return

    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate("OneFAQ", {
            faqId: item.faqId,
          })
        }
      >
        <View style={styles.profileSectionContainer}>
          <View style={styles.textIconContainer}>
            <Text style={{ fontSize: moderateScale(16), fontWeight: "bold" }}>
              {item.question}
            </Text>
          </View>
          <Entypo
            name="chevron-small-right"
            size={moderateScale(25)}
            color="black"
          />
        </View>
      </TouchableOpacity>
    )
  }, [])

  useEffect(() => {
    dispatch(searchFAQ({ machineId }))
  }, [dispatch, machineId])

  return (
    <View style={styles.container}>
      <HeaderComponent backButton={true} />
      <FlatList
        renderItem={({ item, index }) => renderItem(item, index)}
        data={faq}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  profileSectionContainer: profil.profileSectionContainer,
  icon: profil.icon,
  textIconContainer: profil.textIconContainer,
  profilViewContainer: profil.profilViewContainer,
})

export default FAQ
