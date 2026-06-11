import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

import AddExpenseScreen from "./screens/AddExpenseScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [expenses, setExpenses] = useState([]);

  function addExpense(description, value) {
    const newExpense = {
      id: Date.now().toString(),
      description,
      value: parseFloat(value),
    };

    setExpenses((prev) => [...prev, newExpense]);
  }

  function deleteExpense(id) {
    setExpenses((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Gastos">
          {(props) => (
            <HomeScreen
              {...props}
              expenses={expenses}
              deleteExpense={deleteExpense}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Adicionar Gasto">
          {(props) => (
            <AddExpenseScreen
              {...props}
              addExpense={addExpense}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}