import { moderateScale } from '../../../utils/Responsive'

const open = {
  borderRadius: moderateScale(4),
  backgroundColor: "#22C55E",
  padding: moderateScale(5),
  color: "white",
  fontWeight: "bold",
}

const closed = {
  borderRadius: moderateScale(4),
  backgroundColor: "#EF4444",
  padding: moderateScale(5),
  color: "white",
  fontWeight: "bold",
}

const inProgress = {
  borderRadius: moderateScale(4),
  backgroundColor: "#3B82F6",
  padding: moderateScale(5),
  color: "white",
  fontWeight: "bold",
}

const nouveau = {
  borderRadius: moderateScale(4),
  backgroundColor: "#3B82F6",
  padding: moderateScale(5),
  color: "white",
  fontWeight: "bold",
}

const validate = {
  borderRadius: moderateScale(4),
  backgroundColor: "#22C55E",
  padding: moderateScale(5),
  color: "white",
  fontWeight: "bold",
}

const ended = {
  borderRadius: moderateScale(4),
  backgroundColor: "#EF4444",
  padding: moderateScale(5),
  color: "white",
  fontWeight: "bold",
}

export default {
  open,
  closed,
  inProgress,
  nouveau,
  validate,
  ended
}
