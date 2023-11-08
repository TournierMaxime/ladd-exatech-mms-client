import { moderateScale } from "../../../utils/Responsive"

const formContainer = {
  backgroundColor: "#fff",
  padding: moderateScale(20),
  borderRadius: moderateScale(10),
  margin: moderateScale(20),
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: moderateScale(2),
  },
  shadowOpacity: moderateScale(0.25),
  shadowRadius: moderateScale(3.84),
  elevation: moderateScale(5),
}

const formInput = {
  backgroundColor: "#f2f2f2",
  color: "#000",
  padding: moderateScale(10),
  borderRadius: moderateScale(5),
  marginBottom: moderateScale(10),
  height: moderateScale(50),
  fontSize: moderateScale(16),
}

const formTextArea = {
  backgroundColor: "#f2f2f2",
  color: "#000",
  borderRadius: moderateScale(5),
  marginBottom: moderateScale(10),
  padding: moderateScale(10),
  height: moderateScale(250),
  textAlignVertical: "top",
  fontSize: moderateScale(16),
  lineHeight: moderateScale(30)
}

const formLabel = {
  fontSize: moderateScale(16),
  fontWeight: "bold",
  marginBottom: moderateScale(10),
}

const dropdownBtn = {
  backgroundColor: "#f2f2f2",
  borderRadius: moderateScale(8),
  width: "100%",
  height: moderateScale(50),
}
const dropdownBtnTxt = {
  color: "#444",
  textAlign: "left",
  fontSize: moderateScale(16),
}

const dropdown = { backgroundColor: "#EFEFEF" }
const dropdownRow = {
  backgroundColor: "#EFEFEF",
  borderBottomColor: "#C5C5C5",
}
const dropdownRowTxt = { color: "#444", textAlign: "left" }

const box = {
  marginVertical: moderateScale(10),
}

export default {
  formLabel,
  formInput,
  formTextArea,
  formContainer,
  dropdownBtn,
  dropdownBtnTxt,
  dropdown,
  dropdownRow,
  dropdownRowTxt,
  box,
}
