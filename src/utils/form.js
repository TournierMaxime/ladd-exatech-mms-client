import React, { Fragment } from "react"
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native"
import form from "../styles/components/utils/form"
import { ToastError } from "./Toast"
import * as ImagePicker from "expo-image-picker"
import * as DocumentPicker from "react-native-document-picker"
import { AntDesign } from "@expo/vector-icons"
import { moderateScale } from "./Responsive"

const MIME_TYPES = {
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pdf: "application/pdf",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}

const createTextInput = (
  data,
  setData,
  value,
  placeHolder,
  field,
  editable = true,
  multiline = false
) => {
  return (
    <TextInput
      style={multiline === true ? styles.formTextArea : styles.formInput}
      placeholder={placeHolder}
      onChangeText={(text) => setData({ ...data, [field]: text })}
      editable={editable}
      value={value}
      multiline={multiline}
    />
  )
}

const handleError = (error, defaultErrMsg) => {
  console.log(error?.response?.data?.errMsg || error)
  ToastError("error", error?.response?.data?.errMsg || defaultErrMsg, true)
}

const getMimeType = (fileUri) => {
  const fileUriParts = fileUri.split(".")
  const fileType = fileUriParts[fileUriParts.length - 1]
  return MIME_TYPES[fileType.toLowerCase()] || ""
}

const removeFiles = (index, data, setData) => {
  const updatedFiles = data.file.filter((_, i) => i !== index)
  setData({ ...data, file: updatedFiles })
}

const createFormData = (data, fields) => {
  for (let i = 0; i < fields.length; i++) {
    if (!data[fields[i]]) {
      ToastError("error", "Tous les champs sont obligatoires", true)
      return
    }
  }

  const formData = new FormData()

  fields.forEach((field) => {
    formData.append(field, data[field])
  })

  if (data.file) {
    data.file.forEach((fileUri, index) => {

      let fileType;
      if(fileUri.extension !== ""){
        fileType = fileUri.extension
      } else {
        const uriParts = fileUri.uri.split(".");
        fileType = uriParts[uriParts.length - 1];
      }

      let file = {};

      const imageExtensions = ["jpg", "jpeg", "png"]
      const isImage = imageExtensions.includes(fileType.toLowerCase())
      const docExtensions = ["pdf", "doc", "docx", "xls", "xlsx"]
      const isDoc = docExtensions.includes(fileType.toLowerCase())

      if (isImage) {
        file = {
          uri: fileUri.uri,
          name: `photo_${index}.${fileType}`,
          type: `image/${fileType}`
        }
      } else if (isDoc) {
        file = {
          uri: fileUri.uri,
          name: `docs_${index}.${fileType}`,
          type: getMimeType(fileType)
        }
      }

      formData.append("file", file)
    })
  }

  return formData
}

const pickMedia = async (mediaType, data, setData) => {
  try {
    let results

    if (mediaType === "document") {
      results = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
        ],
        allowMultiSelection: true,
      })
    } else if (mediaType === "image") {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!")
        return
      }

      results = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 0.2,
        allowsMultipleSelection: true,
      })

      if (results.canceled) {
        results = null
      } else {
        results = results.assets
      }
    }

    if (results) {
      const resultsWithExtension = results.map((res) => {
        let extension = "";
        if (res.name) {
          extension = res.name.split(".").pop();
        }
        return {
          ...res,
          extension,
        }
      })
      setData({
        ...data,
        file: [...data.file, ...resultsWithExtension],
      })
      console.log("results", resultsWithExtension)
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log(err)
    } else {
      throw err
    }
  }
}

const FileDisplayItem = ({ fileData, index, removeFiles }) => {
  const extensions = ["jpg", "jpeg", "png"]
  const uriParts = fileData.uri.split(".");
  const fileType = uriParts[uriParts.length - 1];
  const isImage = extensions.includes(fileType.toLowerCase())

  let fileName = fileData.name

  return (
    <Fragment key={index}>
      {isImage ? (
        <Image
          source={{ uri: fileData.uri }}
          style={{
            width: moderateScale(200),
            height: moderateScale(200),
            marginTop: moderateScale(10),
          }}
        />
      ) : (
        <Text style={{ marginTop: moderateScale(10) }}>
          {fileName}
        </Text>
      )}
      <TouchableOpacity onPress={() => removeFiles(index)}>
        <AntDesign name="delete" size={moderateScale(24)} color="red" />
      </TouchableOpacity>
    </Fragment>
  );
};


const fileDisplay = (data, setData) => {
  return (
    data.file &&
    data.file.map((fileData, index) => (
      <FileDisplayItem
        key={index}
        fileData={fileData}
        removeFiles={() => removeFiles(index, data, setData)}
      />
    ))
  );
};

const styles = StyleSheet.create({
  formInput: form.formInput,
  formTextArea: form.formTextArea,
})

export {
  createTextInput,
  handleError,
  getMimeType,
  removeFiles,
  createFormData,
  pickMedia,
  fileDisplay,
}
