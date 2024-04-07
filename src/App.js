import "./App.css";
import Home from "./pages/App/Home";
import { UserContextProvider } from "./hooks/authenticate/UserContextProvider";
import MessageInformationProvider from "./hooks/message-information/MessageInformationProvider";

function App() {
  return (
    <MessageInformationProvider>
      <UserContextProvider>
        <Home />
      </UserContextProvider>
    </MessageInformationProvider>
  );
}

export default App;
