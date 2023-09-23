import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home/";
import { BookmarkSimple, House, MagnifyingGlass } from "phosphor-react-native";
import { Details } from "../screens/Details";
import { MyList } from "../screens/MyList";
import { Search } from "../screens/Search";

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#242a32",
          height: 78,
          alignItems: "center",
          borderTopWidth: 1,
          borderTopColor: "#0296e5",
        },
        headerShown: false,
        tabBarActiveTintColor: "#0296e5",
        tabBarInactiveTintColor: "#67686d",
        tabBarShowLabel: false,
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House color={color} size={30} weight="light" />
          ),
        }}
      />
      <Screen
        name="Details"
        component={Details}
        options={{
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="MyList"
        component={MyList}
        options={{
          tabBarIcon: ({ color }) => (
            <BookmarkSimple color={color} size={30} weight="light" />
          ),
        }}
      />
      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <MagnifyingGlass color={color} size={30} weight="light" />
          ),
        }}
      />
    </Navigator>
  );
}
