import React, { useEffect, useState, useCallback, Fragment } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Button,
  Linking,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native"
import { moderateScale } from "../../utils/Responsive"
import { useDispatch, useSelector } from "react-redux"
import {
  searchComments,
  resetSearchComments,
} from "../../redux/actions/comments"
import {
  getOneTicket,
  updateTicket,
  searchTickets,
} from "../../redux/actions/tickets"
import moment from "moment"
import useLoadMore from "../../utils/LoadMore"
import NoDataFound from "../../utils/NoDataFound"
import CreateButton from "../../utils/CreateButton"
import ticket from "../../styles/components/utils/ticket"
import tag from "../../styles/components/utils/tag"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import Message from "../../utils/Message"
import HeaderComponent from "../../components/Header"
import { useNavigation } from "@react-navigation/native"
import button from "../../styles/components/utils/button"

const Attachment = ({ file, index }) => {
  const extensions = ["jpg", "jpeg", "png"]
  const fileExtension = file.split(".").pop()
  const isImage = extensions.includes(fileExtension.toLowerCase())

  let parts = file.split("/")
  let fileName = parts.pop() || parts.pop()
  let fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".")

  return (
    <TouchableOpacity
      style={styles.tagContainer}
      onPress={() => Linking.openURL(file)}
      key={index}
    >
      <Text style={styles.tagText}>{fileNameWithoutExtension}</Text>
      {isImage ? (
        <Fragment>
          <Entypo
            style={{ marginRight: moderateScale(15) }}
            name="image"
            size={moderateScale(25)}
            color="black"
          />
        </Fragment>
      ) : (
        <Fragment>
          <AntDesign
            style={{ marginRight: moderateScale(15) }}
            name="filetext1"
            size={moderateScale(25)}
            color="black"
          />
        </Fragment>
      )}
    </TouchableOpacity>
  )
}

const ImageItem = ({ imagePath }) => (
  <View>
    <Image
      source={{ uri: imagePath }}
      style={{
        width: moderateScale(200),
        height: moderateScale(200),
        marginVertical: moderateScale(15),
      }}
    />
  </View>
)

const Comment = ({ item }) => {
  const attachments = () => {
    if (!item.Attachments) return
    return item.Attachments.map((attachment, index) => (
      <Attachment key={index} file={attachment.file} index={index} />
    ))
  }
  const images = () => {
    if (!item.Images) return
    return item.Images.map((image, index) => (
      <Attachment key={index} file={image.imagePath} index={index} />
    ))
  }
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerText}>John Doe</Text>
        <Text style={styles.headerText}>
          {moment(item.createdAt).format("DD/MM/YYYY à HH:mm:ss")}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.commentText}>{item.text}</Text>
        </View>
        <View>
          {attachments()}
          {images()}
        </View>
      </View>
    </View>
  )
}

const Author = ({ item, dispatch, ticketId, machineId }) => {
  const resolveTicket = async () => {
    await dispatch(updateTicket(ticketId, { status: "closed" }))
    await dispatch(getOneTicket(ticketId))
    await dispatch(searchTickets(machineId, { page: 1 }))
  }

  const alertSolvedTicket = async () => {
    return Alert.alert(
      "Ce ticket est t-il résolu ?",
      "La résolution de ce ticket entrainera la fermeture de votre demande.\n\nÊtes vous sur de vouloir résoudre ce ticket ?",
      [
        {
          text: "Confirmer",
          onPress: () => resolveTicket(),
        },
        {
          text: "Annuler",
          cancelable: true,
        },
      ]
    )
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.headerText}>John Doe</Text>
          <Text style={styles.headerText}>
            {moment(item?.createdAt).format("DD/MM/YYYY à HH:mm:ss")}
          </Text>
        </View>
        <View>
          {item?.status === "closed" ? (
            <Ionicons name="checkbox" size={moderateScale(25)} color="green" />
          ) : (
            <TouchableOpacity onPress={alertSolvedTicket}>
              <Ionicons
                name="checkbox-outline"
                size={moderateScale(25)}
                color="black"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.commentText}>{item?.title}</Text>
          <Text style={styles.commentText}>{item?.description}</Text>
        </View>
        <View>
          {item?.Images.map((image, index) => (
            <ImageItem key={index} imagePath={image.imagePath} />
          ))}
        </View>
      </View>
    </View>
  )
}

const OneTicket = ({ route }) => {
  const { ticketId, machineId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const ticket = useSelector((state) => state.getOneTicket.data.ticket)
  const data = useSelector((state) => state.searchComments.data)
  const comments = useSelector((state) => state.searchComments.data.comments)
  const { currentPage, loadMore } = useLoadMore(data.page, data.totalPages)
  const [allComments, setAllComments] = useState([])

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    await dispatch(getOneTicket(ticketId))
    await dispatch(searchComments(ticketId, { page: currentPage }))
    setRefreshing(false)
  }, [ticketId, currentPage, dispatch])

  useEffect(() => {
    const updateResults = async () => {
      if (comments?.length > 0) {
        if (currentPage > 1) {
          setAllComments((prevResults) => [...prevResults, ...comments])
        } else {
          setAllComments(comments)
        }
      }
    }
    updateResults()
  }, [comments])

  useEffect(() => {
    dispatch(getOneTicket(ticketId))
    dispatch(searchComments(ticketId, { page: currentPage }))
  }, [dispatch, ticketId, currentPage])

  useEffect(() => {
    return () => {
      dispatch(resetSearchComments())
    }
  }, [])

  return (
    <View style={styles.container}>
      <HeaderComponent backButton={true} />
      {ticket?.status !== "closed" && ticket?.provider !== "Discord" ? (
        <CreateButton ticketId={ticketId} machineId={machineId} />
      ) : null}
      {ticket?.Intervention?.interventionId ? (
        <Fragment>
          <Message
            message={
              "Ce ticket comporte une intervention planifiée. Vous pouvez la consulter ci-dessous."
            }
            priority={"warning"}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("OneIntervention", {
                interventionId: ticket?.Intervention?.interventionId,
              })
            }
            style={[styles.blueBtn, { width: '90%', marginLeft: 'auto', marginRight: 'auto' }]}
          >
            <Text style={styles.btnTxt}>Consulter</Text>
          </TouchableOpacity>
        </Fragment>
      ) : null}
      <FlatList
        ListHeaderComponent={
          <Author
            ticketId={ticketId}
            machineId={machineId}
            item={ticket}
            dispatch={dispatch}
          />
        }
        style={{ marginTop: moderateScale(15) }}
        data={allComments}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <Comment item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          ticket?.provider === "Discord" ? (
            <Message
              message={
                "Cette conversation a été initiée sur Discord. Vous pouvez suivre celle-ci sur l'application."
              }
              priority={"info"}
            />
          ) : (
            <NoDataFound message={"Aucun commentaires sur ce ticket"} />
          )
        }
        ListFooterComponent={
          ticket?.provider === "Discord" ? (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: moderateScale(25),
              }}
            >
              <Button
                title="Continuer sur Discord"
                onPress={() => Linking.openURL(ticket?.discordInviteLink)}
              />
            </View>
          ) : comments?.length > 0 ? (
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: moderateScale(25),
              }}
            >
              <Button
                title="Charger plus de commentaires"
                onPress={loadMore}
                disabled={currentPage >= data.totalPages}
              />
            </View>
          ) : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: ticket.container,
  card: ticket.card,
  cardHeader: ticket.cardHeader,
  headerText: ticket.headerText,
  cardContent: ticket.cardContent,
  commentText: ticket.commentText,
  tagContainer: tag.tagContainer,
  tagText: tag.tagText,
  blueBtn: button.blueBtn,
  btnTxt: button.btnTxt,
})

export default OneTicket
