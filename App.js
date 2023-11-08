import { connect, Provider } from "react-redux"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import store from "./src/redux/store"
import Home from "./src/views/Home"
import OneMachine from "./src/views/Machines/OneMachine"
import CreateMachine from "./src/views/Machines/CreateMachine"
import CreateTicket from "./src/views/Tickets/CreateTicket"
import DotDetails from "./src/utils/DotDetails"
import AllTickets from "./src/views/Tickets/AllTickets"
import OneTicket from "./src/views/Tickets/OneTicket"
import FAQCategory from "./src/views/FAQ/FAQCategory"
import FAQ from "./src/views/FAQ/FAQ"
import OneFAQ from "./src/views/FAQ/OneFAQ"
import InterventionForm from "./src/views/Interventions/InterventionForm"
import AllInterventions from "./src/views/Interventions/AllInterventions"
import OneIntervention from "./src/views/Interventions/OneIntervention"

const RootStack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="OneMachine"
          component={OneMachine}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="CreateMachine"
          component={CreateMachine}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="CreateTicket"
          component={CreateTicket}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="DotDetails"
          component={DotDetails}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="AllTickets"
          component={AllTickets}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="OneTicket"
          component={OneTicket}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="FAQCategory"
          component={FAQCategory}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="FAQ"
          component={FAQ}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="OneFAQ"
          component={OneFAQ}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="InterventionForm"
          component={InterventionForm}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="AllInterventions"
          component={AllInterventions}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
        <RootStack.Screen
          name="OneIntervention"
          component={OneIntervention}
          options={{
            header: () => null,
            headerTransparent: true,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

const ConnectedApp = connect()(App)

const AppWithRedux = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
)

export default AppWithRedux
