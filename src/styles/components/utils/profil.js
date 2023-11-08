import { moderateScale } from "../../../utils/Responsive"

const profileSectionContainer = {
    backgroundColor: '#fff',
    width: '100%',
    padding: moderateScale(20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(1)
}

const icon = {
    marginRight: moderateScale(15)
}

const textIconContainer = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
}

const profilViewContainer = {
    display: 'flex',
    width: '100%'
}

const formInput = {
    backgroundColor: '#f2f2f2',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10),
    width: '100%'
}

const formLabel = {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
}

export default { formInput, formLabel, profilViewContainer, profileSectionContainer, icon, textIconContainer }