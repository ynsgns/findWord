import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { findWord } from "./lib/findWord";

export default function App() {
  const [charValues, setCharValues] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseObj, serResponseObj] = useState<any>({});
  const [selectedRow, setSelectedRow] = useState<number[]>([]);
  const { loopSize, loopTime, findedWord } = responseObj || {};
  const onCharValuesChange = (val: string) => {
    setCharValues(val);
  };

  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const onFindClick = async () => {
    setLoading(true);
    setSelectedRow([]);
    await delay(500);
    findWord(charValues)
      .then((res) => {
        serResponseObj(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSelectRow = (index: number) => {
    let oldArr = selectedRow;
    oldArr.push(index);
    setSelectedRow(selectedRow.concat(index));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.labal}>Harfleri gir</Text>
        <TextInput
          style={styles.input}
          placeholder="Harfleri gir"
          value={charValues}
          onChangeText={onCharValuesChange}
          onSubmitEditing={onFindClick}
        />
      </View>
      <View
        style={{
          ...styles.buttonContainer,
          opacity: charValues.length <= 0 || loading ? 0.6 : 1,
        }}
      >
        <TouchableOpacity
          disabled={charValues.length <= 0 || loading}
          onPress={onFindClick}
        >
          <Text style={styles.btnTxt}>Kelimeleri bul</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" />}
      {loopSize && <Text>loop size : {loopSize}</Text>}
      {loopTime && <Text>loop time : {loopTime}</Text>}
      <View style={styles.resContainer}>
        {findedWord && (
          <FlatList
            data={findedWord}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => onSelectRow(index)}>
                <Text
                  key={index}
                  style={{
                    ...styles.resTxt,
                    textDecorationLine:
                      selectedRow.filter((x) => x === index)?.length > 0
                        ? "line-through"
                        : "none",
                  }}
                >
                  {index + 1}. {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 100,
  },
  inputContainer: {
    width: "90%",
  },
  labal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    fontSize: 20,
  },
  buttonContainer: {
    padding: 14,
    marginTop: 8,
    borderRadius: 4,
    backgroundColor: "#D23D56",
    width: "90%",
    alignItems: "center",
  },
  resContainer: {
    width: "90%",
  },
  resTxt: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
  },
  btnTxt: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
