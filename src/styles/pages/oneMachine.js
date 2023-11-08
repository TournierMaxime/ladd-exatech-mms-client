import { moderateScale } from '../../utils/Responsive'

const container = {
  flex: 1,
  height: '100%',
  width: '100%'
}

const cardContainer = {
  backgroundColor: "white",
  shadowColor: "#000",
  padding: moderateScale(20),
  shadowOffset: {
    width: 0,
    height: moderateScale(2),
  },
  shadowOpacity: moderateScale(0.25),
  shadowRadius: moderateScale(3.84),
  elevation: moderateScale(5),
  height: '100%'
}

const text = {
  color: "black",
  fontSize: moderateScale(20),
  fontWeight: "bold",
  textAlign: "center",
}

export default {
  container,
  cardContainer,
  text,
}
