import { moderateScale } from "../../../utils/Responsive"

const container = {
  flex: 1,
  backgroundColor: "#efefef"
}
const card = {
  marginTop: moderateScale(15),
  backgroundColor: "white",
  width: "90%",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: moderateScale(5),
}
const cardHeader = {
  margin: moderateScale(15),
  flexDirection: "row",
  justifyContent: "space-between",
}
const headerText = {
  fontSize: moderateScale(16),
  fontWeight: "bold",
}
const cardContent = {
  margin: moderateScale(15),
  flexDirection: "column",
  justifyContent: "flex-start",
}
const commentText = {
  lineHeight: moderateScale(30),
  fontSize: moderateScale(16),
  textAlign: "justify",
  marginVertical: moderateScale(10),
}

export default {
  container,
  card,
  cardHeader,
  headerText,
  cardContent,
  commentText,
}
