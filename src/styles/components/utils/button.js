import { moderateScale } from "../../../utils/Responsive"

const button = {
  width: moderateScale(100),
  height: moderateScale(50),
  textAlign: "center",
}

const blueBtn = {
  padding: moderateScale(10),
  backgroundColor: "rgb(33, 150, 243)",
  alignItems: "center",
}

const btnTxt = {
  fontSize: moderateScale(16),
  color: "white",
  textTransform: "uppercase",
}

export default {
  button,
  blueBtn,
  btnTxt
}
