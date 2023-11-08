import React, { useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { searchFAQCategory } from "../../redux/actions/faqCategory"
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { moderateScale } from "../../utils/Responsive"
import profil from "../../styles/components/utils/profil"
import {
  Entypo,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "react-native-vector-icons"
import { useNavigation } from "@react-navigation/native"
import HeaderComponent from "../../components/Header"

const FAQCategory = ({ route }) => {
  const { machineId } = route.params
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const searchFAQCategories = useSelector(
    (state) => state.searchFAQCategory.data.faqCategory
  )

  const renderItem = useCallback((item, index) => {
    const icons = () => {
      switch (item.topic) {
        case "Mises à jour et améliorations":
          return (
            <MaterialIcons
              style={styles.icon}
              name="system-update"
              size={moderateScale(25)}
              color="black"
            />
          )
        case "Maintenance et entretien":
          return (
            <AntDesign
              style={styles.icon}
              name="tool"
              size={moderateScale(25)}
              color="black"
            />
          )
        case "Sécurité et précautions":
          return (
            <MaterialIcons
              style={styles.icon}
              name="security"
              size={moderateScale(25)}
              color="black"
            />
          )
        case "Fonctionnement général":
          return (
            <Entypo
              style={styles.icon}
              name="magnifying-glass"
              size={moderateScale(25)}
              color="black"
            />
          )
        case "Problèmes courants et dépannage":
          return (
            <MaterialCommunityIcons
              style={styles.icon}
              name="comment-question-outline"
              size={moderateScale(25)}
              color="black"
            />
          )
      }
    }
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate("FAQ", {
            machineId,
            faqCategoryId: item.faqCategoryId,
          })
        }
      >
        <View style={styles.profileSectionContainer}>
          <View style={styles.textIconContainer}>
            {icons()}

            <Text style={{ fontSize: moderateScale(16) }}>{item.topic}</Text>
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
    dispatch(searchFAQCategory())
  }, [dispatch])

  return (
    <View style={styles.container}>
      <HeaderComponent backButton={true} />
      <FlatList
        keyExtractor={(item) => item.faqCategoryId.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
        data={searchFAQCategories}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef"
  },
  profileSectionContainer: profil.profileSectionContainer,
  icon: profil.icon,
  textIconContainer: profil.textIconContainer,
  profilViewContainer: profil.profilViewContainer,
})

export default FAQCategory
