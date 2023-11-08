import React, { useEffect, useState, Fragment, useMemo } from "react"
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Button,
} from "react-native"
import home from "../styles/pages/home"
import { searchMachines } from "../redux/actions/machines"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import TableComponent from "../utils/TableComponent"
import { EvilIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import Refresh from "../utils/Refresh"
import SpeedFabView from "../utils/SpeedDial"
import { moderateScale } from "../utils/Responsive"
import HeaderComponent from "../components/Header"
import { Alert } from "react-native"
import { searchAPKs } from "../redux/actions/apks"
import relaseApk from "../../android/app/release/output-metadata.json"
import RNFS from "react-native-fs"
//import * as Progress from "react-native-progress"

const Home = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [downloading, setDownloading] = useState(false)

  const apks = useSelector((state) => state.searchAPKs.data.apks)

  const latestAPKVersion = apks?.find((apk) => apk.apkId)
  const currentAPKVersion = relaseApk.elements.find((apk) => apk.versionCode)

  const machines = useSelector(
    (state) => state?.searchMachines?.data?.machines,
    shallowEqual
  )

  const handlePress = (item) => {
    navigation.navigate("OneMachine", { machineId: item.machineId })
  }

  const handleRefresh = async () => {
    await dispatch(searchMachines())
    await dispatch(searchAPKs())
  }

  const headerData = ["ID", "Type", "Etat", "Détails"]
  const rowData = useMemo(() =>
    machines
      ? machines.map((machine, index) => [
          machine.machineId.toString(),
          machine.type,
          machine.state,
          <TouchableOpacity
            style={styles.detailsContainer}
            key={index}
            onPress={() => handlePress(machine)}
          >
            <View style={styles.detailsContainerIcon}>
              <EvilIcons
                name="external-link"
                size={moderateScale(36)}
                color="black"
              />
            </View>
          </TouchableOpacity>,
        ])
      : []
  )

  const deleteFiles = async (filepath) => {
    try {
      let exists = await RNFS.exists(filepath)

      if (exists) {
        await RNFS.unlink(filepath)
        console.log("File deleted")
      } else {
        console.log("File does not exist")
      }
    } catch (error) {
      console.error("Error during file deletion: ", error)
    }
  }

  const checkForUpdate = () => {
    try {
      if (currentAPKVersion?.versionCode < latestAPKVersion?.versionCode) {
        Alert.alert(
          "Mise à jour disponible",
          "Voulez-vous mettre à jour l’application maintenant?",
          [
            {
              text: "Non",
              onPress: () => console.log("Mise à jour refusée"),
            },
            {
              text: "Oui",
              onPress: () => {
                deleteFiles(
                  `${RNFS.ExternalStorageDirectoryPath}/Download/app-release.apk`
                )
                downloadAndInstallApk(latestAPKVersion.apkUrl)
              },
            },
          ]
        )
      }
    } catch (error) {
      console.error("Erreur de vérification de mise à jour:", error)
    }
  }

  const downloadAndInstallApk = async (apkUrl) => {
    try {
      const apkPath = `${RNFS.ExternalStorageDirectoryPath}/Download/app-release.apk`
      setDownloading(true)

      const download = RNFS.downloadFile({
        fromUrl: apkUrl,
        toFile: apkPath,
        progress: (res) => {
          const downloadProgress = Math.round(
            (res.bytesWritten * 100) / res.contentLength
          )
          setProgress(downloadProgress)
        },
        progressDivider: 1,
      })

      download.promise
        .then(async (result) => {
          if (result.statusCode == 200) {
            Alert.alert(
              "Téléchargement réussi",
              "Ouvrez l'application de gestion de fichier de votre appareil => Téléchargement (Download) => app-release.apk"
            )
            setProgress(0)
            setDownloading(false)
          }
        })
        .catch((error) => {
          console.log(error)
          setDownloading(false)
        })
    } catch (error) {
      console.error("Failed to download and install APK:", error)
      setDownloading(false)
    }
  }

  useEffect(() => {
    dispatch(searchAPKs())
  }, [dispatch])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        await dispatch(searchMachines())
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [dispatch])

  return (
    <Fragment>
      <View style={styles.container}>
        <HeaderComponent backButton={false} />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            {currentAPKVersion?.versionCode < latestAPKVersion?.versionCode ? (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: moderateScale(15),
                }}
              >
                <Button
                  title="Mise à jour disponible"
                  onPress={() => checkForUpdate()}
                />
                {downloading && (
                  <View style={{ marginTop: moderateScale(15) }}>
                    <Text>Téléchargement en cours... {progress}/100%</Text>
                  </View>
                )}
              </View>
            ) : null}
            <View style={styles.viewContainer}>
              <View>
                <Text style={styles.title}>Liste des machines</Text>
              </View>
              <View>
                <SpeedFabView />
              </View>
            </View>
            <Refresh onRefresh={handleRefresh}>
              <TableComponent headerData={headerData} rowData={rowData} />
            </Refresh>
          </View>
        )}
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: home.container,
  text: home.text,
  title: home.title,
  viewContainer: home.viewContainer,
  detailsContainer: home.detailsContainer,
  detailsContainerIcon: home.detailsContainerIcon,
})

export default Home
