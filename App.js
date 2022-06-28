import { LogBox } from "react-native";
import AuthNavigation from "./AuthNavigation";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["AsyncStorage"]);
LogBox.ignoreLogs(["FirebaseError"]);

function App() {
  return <AuthNavigation />;
}
export default App;
