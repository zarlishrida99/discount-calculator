import React, { useState } from "react";
import { StyleSheet, View,Text,TouchableOpacity, Button, FlatList, TextInput,Modal } from "react-native";

export default function App() {
  const [calculations, setcalculations] = useState([]);
  const [modalShow,setmodalShow]=useState(false);
  const [originalPrice, setoriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [answer,setAnswer]=useState("");
  const [tempData,setTempData]=useState("")
  const [showNotification,setShowNotification]=useState(false);

  const priceHandler = (enteredText) => {
    if (parseFloat(enteredText) >= 0 || parseFloat(enteredText) <= 9) {
      setoriginalPrice(enteredText);
    }
  };

  const discountHandler = (enteredText) => {
    if (parseFloat(enteredText) > 0 || parseFloat(enteredText) <= 9) {
      if(discount.length <2){
        setDiscount(enteredText);
      }
    }
  };

  const performCalulation = () => {
    if(originalPrice !== '' && discount !== ''){
      let price = parseFloat(originalPrice);
      let reminder = price / 100;
      let final = (reminder * parseInt(discount, 10)).toFixed(2);
      let show = `${originalPrice} - ${discount}% = ${final}`;
      setTempData(show);
      setAnswer(`You Saved ${final}`);
    }
  };

  const addCalculations = (goalTitle) => {
    setcalculations((calculations) => [
      ...calculations,
      { id: Math.random().toString(), value: goalTitle },
    ]);
  };

  const addToList=()=>{
    if(answer !== ""){
      addCalculations(tempData);
      setShowNotification(true);
      setTimeout(()=>setShowNotification(false), 300);
      setoriginalPrice('');
      setDiscount('');
      setAnswer('');
    }
  }
  const removeCalculations=(itemID)=>{
    setcalculations(currentItems=>{
      return currentItems.filter((item) => item.id !== itemID);
    })
  }

  const clear =()=>{
    setoriginalPrice('');
    setDiscount('');
    setAnswer('');
    setTempData('');
  }
  const closeModal=()=>{
    setmodalShow(false);
  }
  const openModal = () => {
    setmodalShow(true);
  };
  return (
    <View style={styles.inputContainer}>
      {showNotification ? <Text style={styles.notification}>Data Saved</Text> : <Text></Text>}
      <TextInput
        placeholder="Original Price"
        style={styles.input}
        keyboardType="numeric"
        keyboardAppearance="dark"
        onChangeText={priceHandler}
        onEndEditing={performCalulation}
        value={originalPrice}
      />
      <TextInput
        placeholder="Discount"
        style={styles.input}
        keyboardType="numeric"
        keyboardAppearance="dark"
        onChangeText={discountHandler}
        onEndEditing={performCalulation}
        value={discount}
      />
      <TextInput
        placeholder="Discounted Value"
        style={styles.input2}
        editable={false}
        value={answer}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Clear" color="red" onPress={clear} />
        </View>
        <View style={styles.button}>
          <Button title="Save" onPress={addToList} />
        </View>
      </View>
      <View style={styles.memory}>
        <View style={styles.buttonM}>
          <Button title="Show Memory" onPress={openModal} />
        </View>
      </View>
      <Modal visible={modalShow} animationType="slide">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <Text style={styles.header}>Saved Calculations</Text>
          <TouchableOpacity style={styles.back} onPress={closeModal}>
            <Text style={{ textAlign: "center" }}>Back</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(item, index) => item.id}
          data={calculations}
          renderItem={(itemData) => (
            <CalList
              id={itemData.item.id}
              onDelete={removeCalculations}
              title={itemData.item.value}
            />
          )}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input2: {
    width: "80%",
    fontSize: 20,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  button: {
    width: "40%",
    borderRadius: 10,
  },
  memory: {
    marginTop: 20,
    width: "50%",
  },
  header: {
    alignSelf: "center",
    width: "60%",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 10,
  },
  back: {
    backgroundColor: "#ccc",
    padding: 8,
    width: 80,
    borderWidth: 1,
    borderRadius: 10,
  },
  notification:{
    color:'red',
    fontSize:19
  }
});