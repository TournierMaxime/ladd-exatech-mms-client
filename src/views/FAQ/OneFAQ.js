import React, { useEffect } from "react"
import {
  ScrollView,
  View,
  Image,
  useWindowDimensions,
} from "react-native"
import { getOneFAQ } from "../../redux/actions/faq"
import { useDispatch, useSelector } from "react-redux"
import { moderateScale } from "../../utils/Responsive"
import YoutubeIframe from "../../utils/YouTubeIFrame"
import RenderHtml from "react-native-render-html"
import HeaderComponent from "../../components/Header"

const OneFAQ = ({ route }) => {
  const { faqId } = route.params
  const dispatch = useDispatch()
  const oneFAQ = useSelector((state) => state.getOneFAQ.data.faq)
  const { width } = useWindowDimensions()

  const sectionType = (item) => {
    const tagsStyles = {
      h1: {
        fontSize: moderateScale(22),
        paddingHorizontal: moderateScale(15)
      },
      h2: {
        fontSize: moderateScale(21),
        paddingHorizontal: moderateScale(15)
      },
      h3: {
        fontSize: moderateScale(20),
        paddingHorizontal: moderateScale(15)
      },
      h4: {
        fontSize: moderateScale(19),
        paddingHorizontal: moderateScale(15)
      },
      h5: {
        fontSize: moderateScale(18),
        paddingHorizontal: moderateScale(15)
      },
      h6: {
        fontSize: moderateScale(17),
        paddingHorizontal: moderateScale(15)
      },
      p: {
        lineHeight: moderateScale(30),
        fontSize: moderateScale(16),
        textAlign: "justify",
        paddingHorizontal: moderateScale(15)
      },
    }

    const images = () => {
      if (item?.Images) {
        return item?.Images.map((item, index) => (
          <Image
            style={{ marginBottom: moderateScale(20) }}
            key={index}
            source={{ uri: item.imagePath }}
            width={moderateScale(250)}
            height={moderateScale(250)}
            resizeMode="contain"
          />
        ))
      }
    }

    switch (item.type) {
      case "text":
        return (
          <RenderHtml
            contentWidth={width}
            source={{ html: item.content }}
            tagsStyles={tagsStyles}
          />
        )
      case "image":
        return images()
      case "video":
        return <YoutubeIframe content={item.content} />
    }
  }

  const sections = oneFAQ?.FAQSections?.map((item, index) => {
    return <View key={index}>{sectionType(item)}</View>
  })

  useEffect(() => {
    dispatch(getOneFAQ(faqId))
  }, [dispatch, faqId])

  return (
    <ScrollView style={{ width: '100%' }}>
      <HeaderComponent backButton={true} />
      {sections}
    </ScrollView>
  )
}

export default OneFAQ
