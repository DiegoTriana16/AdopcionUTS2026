import { Stack } from "expo-router";

export default function AdoptionLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false
    }}
      initialRouteName="home">
      <Stack.Screen
        name="home"
      />
      <Stack.Screen
        name="adoptionForm"
      />
      <Stack.Screen
        name="recommendations"
      />

    </Stack>
  )

}