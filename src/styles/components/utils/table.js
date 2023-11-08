import { moderateScale } from '../../../utils/Responsive'

const container = {
  flex: 1,
  paddingHorizontal: moderateScale(10),
  backgroundColor: "#fff",
  paddingBottom: moderateScale(100)
}
const row = {
  flexDirection: "row",
  paddingVertical: moderateScale(15),
  alignItems: "center",
  justifyContent: "space-between"
}
const rowData = {
  flexDirection: "column",
  paddingVertical: moderateScale(15),
  alignItems: "flex-start",
  justifyContent: "space-between",
}
const header = {
  fontSize: moderateScale(18),
  fontWeight: "bold",
}

export default {
  container,
  row,
  rowData,
  header
}
