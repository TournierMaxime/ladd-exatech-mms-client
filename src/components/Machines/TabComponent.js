import React, { useState } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import DetailsRoute from "./Details/DetailsRoute"
import HistoryRoute from "./History/HistoryRoute"
import tab from "../../styles/components/utils/tab"

const TabComponent = ({ machine }) => {
  const [selectedTab, setSelectedTab] = useState("details")

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setSelectedTab("details")}
        >
          <Text
            style={
              selectedTab === "details"
                ? styles.selectedTabText
                : styles.tabText
            }
          >
            Détails
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setSelectedTab("history")}
        >
          <Text
            style={
              selectedTab === "history"
                ? styles.selectedTabText
                : styles.tabText
            }
          >
            Historique
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab === "details" && <DetailsRoute machine={machine} />}

      {selectedTab === "history" && (
          <HistoryRoute machine={machine} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: tab.container,
  tabContainer: tab.tabContainer,
  tab: tab.tab,
  tabText: tab.tabText,
  selectedTabText: tab.selectedTabText,
})

export default TabComponent
