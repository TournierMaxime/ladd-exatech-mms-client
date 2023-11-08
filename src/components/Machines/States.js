import React, { Fragment } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import form from "../../styles/components/utils/form"

const States = ({ item, machine }) => {
  const states = (item, machine) => {
    switch (item.state) {
      case "ok":
        return (
          <View>
            <Text style={styles.formLabel}>Etat</Text>
            <TextInput
              editable={false}
              style={[
                styles.formInput,
                {
                  backgroundColor: "green",
                  color: "#fff",
                  fontWeight: "bold",
                },
              ]}
              placeholder="Etat"
              defaultValue={item.state}
            />
          </View>
        )
      case "ko":
        return (
          <Fragment>
            <View>
              <Text style={styles.formLabel}>Err ID</Text>
              <TextInput
                editable={false}
                style={styles.formInput}
                placeholder="Err ID"
                defaultValue={machine?.errorId}
              />
            </View>
            <View>
              <Text style={styles.formLabel}>Err Code</Text>
              <TextInput
                editable={false}
                style={styles.formInput}
                placeholder="Err Code"
                defaultValue={item?.Error?.errorCode.toString()}
              />
            </View>
            <View>
              <Text style={styles.formLabel}>Err Niv</Text>
              <TextInput
                editable={false}
                style={styles.formInput}
                placeholder="Err Niv"
                defaultValue={item?.Error?.errorLevel}
              />
            </View>
            <View>
              <Text style={styles.formLabel}>Etat</Text>
              <TextInput
                editable={false}
                style={[
                  styles.formInput,
                  {
                    backgroundColor: "red",
                    color: "#fff",
                    fontWeight: "bold",
                  },
                ]}
                placeholder="Etat"
                defaultValue={item.state}
              />
            </View>
          </Fragment>
        )
      case "unknown":
        return (
          <View>
            <Text style={styles.formLabel}>Etat</Text>
            <TextInput
              editable={false}
              style={[
                styles.formInput,
                {
                  backgroundColor: "grey",
                  color: "#fff",
                  fontWeight: "bold",
                },
              ]}
              placeholder="Etat"
              defaultValue={item.state}
            />
          </View>
        )
    }
  }

  return states(item, machine)
}

const styles = StyleSheet.create({
  formInput: form.formInput,
  formLabel: form.formLabel,
})

export default States
