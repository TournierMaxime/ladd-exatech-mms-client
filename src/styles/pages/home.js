import { moderateScale } from '../../utils/Responsive'

const container = {
  backgroundColor: "#fff",
  flex: 1,
  width: "100%"
}

const text = {
  color: "black",
  fontSize: moderateScale(20),
  fontWeight: "bold",
  textAlign: "center",
}

const title = {
  fontSize: moderateScale(20),
  fontWeight: "bold",
}

const viewContainer = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: moderateScale(10),
  paddingHorizontal: moderateScale(5),
  marginVertical: moderateScale(10),
  marginHorizontal: moderateScale(10)
}

const detailsContainer = {
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  width: moderateScale(42),
  height: moderateScale(42),
  borderRadius: moderateScale(100),
  backgroundColor: "#fafafa",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: moderateScale(2),
  },
  shadowOpacity: moderateScale(0.25),
  shadowRadius: moderateScale(3.84),
  elevation: moderateScale(5),
}

const detailsContainerIcon = {
  position: "absolute",
  top: moderateScale(4),
}

export default {
  container,
  text,
  title,
  viewContainer,
  detailsContainer,
  detailsContainerIcon,
}
