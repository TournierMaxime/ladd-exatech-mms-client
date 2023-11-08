import { moderateScale } from '../../../utils/Responsive'

const container = {
  height: '100%',
  flex: 1
}

const accordContainer = {
  paddingBottom: moderateScale(4),
  flex: 1
}

const accordHeader = {
  padding: moderateScale(12),
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const accordTitle = {
  fontSize: moderateScale(16),
}

const accordBody = {
  padding: 0,
}

const textSmall = {
  fontSize: moderateScale(16),
}

const seperator = {
  height: moderateScale(12),
}

const accordBadge = {
  borderRadius: moderateScale(10),
  padding: moderateScale(4),
  width: moderateScale(8),
  height: moderateScale(8),
}

export default {
  container,
  accordContainer,
  accordHeader,
  accordTitle,
  accordBody,
  textSmall,
  seperator,
  accordBadge,
}
