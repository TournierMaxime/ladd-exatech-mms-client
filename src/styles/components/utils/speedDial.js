import { moderateScale } from '../../../utils/Responsive'

const container = {
  alignItems: "flex-end",
}
const fabButton = {
  width: moderateScale(42),
  height: moderateScale(42),
  justifyContent: "center",
  alignItems: "center",
  borderRadius: moderateScale(100),
  backgroundColor: "#FFF",
}
const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: moderateScale(2),
  },
  shadowOpacity: moderateScale(0.25),
  shadowRadius: moderateScale(3.84),
  elevation: moderateScale(5),
}
const text = {
  fontSize: moderateScale(23),
  textAlign: "center",
}
const speedView = {
  paddingVertical: moderateScale(8),
}

export default {
    container,
    text,
    speedView,
    shadow,
    fabButton
}
