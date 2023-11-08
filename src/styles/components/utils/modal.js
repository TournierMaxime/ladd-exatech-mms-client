import { moderateScale } from '../../../utils/Responsive'

const container = {
    flex: 0
}

const openButton = {
    backgroundColor: '#F194FF',
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    elevation: 2,
}

const textStyle = {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
}

const modalView = {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white'
}

const modalTitle = {
    margin: moderateScale(15),
    fontSize: moderateScale(20),
}

const modalText = {
    margin: moderateScale(15),
    textAlign: 'justify',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(30)
}

const closeIcons = {
    color: '#000',
    marginTop: moderateScale(40)
}

const closeContainer = {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    paddingTop: moderateScale(10),
    width: '100%',
};

const formContainer = {
    padding: moderateScale(20),
    margin: moderateScale(20),
    position: 'relative',
}

const alertModalContainer = {
    alignItems: "center",
    justifyContent: "center",
}

const alertModalView = {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
    top: '25%',
    left: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: moderateScale(0.25),
    shadowRadius: moderateScale(3.84),
    elevation: moderateScale(5),
}

const alertModalText = {

}

const alertModalActions = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}

const alertModalMessage = {
    marginBottom: moderateScale(20)
}

export default {
    formContainer,
    closeContainer,
    container, 
    openButton,
    textStyle,
    modalView,
    modalText,
    closeIcons,
    modalTitle,
    alertModalContainer,
    alertModalView,
    alertModalText,
    alertModalActions,
    alertModalMessage
}