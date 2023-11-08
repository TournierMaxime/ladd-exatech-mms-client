import React, { useState } from "react"
import { RefreshControl, ScrollView } from "react-native"

const Refresh = ({ children, onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await onRefresh()
    setRefreshing(false)
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      }
      style={{ height: "100%" }}
    >
      {children}
    </ScrollView>
  )
}

export default Refresh
