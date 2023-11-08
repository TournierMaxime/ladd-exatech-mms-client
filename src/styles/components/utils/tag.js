import { moderateScale } from "../../../utils/Responsive"

const tagContainer = {
    backgroundColor: "#F2F2F2",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScale(10)
}

const tagText = {
  color: "black",
  margin: moderateScale(15),
  fontSize: moderateScale(16),
}

export default {
  tagContainer,
  tagText,
}
