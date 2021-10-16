import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/task";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const onAdd = () => {
    Keyboard.dismiss()
    setTasks([...tasks, {text: text}])
    setText("")
  }
  const completeTask = (index) => {
    let copy = [...tasks]
    copy.splice(index, 1)
    setTasks([...copy])
  }
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <ScrollView style={styles.items}>
          {tasks.length ? (tasks.map((x, i) => (
            <TouchableOpacity key={i} onLongPress={() => completeTask(i)}>
              <Task task={x.text} />
            </TouchableOpacity>
          ))) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Let's add some tasks below!</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput value={text} onChangeText={setText} style={styles.input} placeholder="Write a task" />
        <TouchableOpacity onPress={onAdd}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    maxHeight: "85%",
    marginTop: 15,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    padding: 15,
    width: 250,
    backgroundColor: "#FAFAFA",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FAFAFA",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 36,
    color: "#C0C0C0"
  },
  empty: {
    width: "100%",
    justifyContent: "center",
    marginTop: 20
  },
  emptyText: {
    textAlign: "center",
    fontSize: 20
  }
});
