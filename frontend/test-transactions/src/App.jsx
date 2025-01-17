import { useState } from "react";
import AccList from "./components/AccList";
import Transaction from "./components/Transaction";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      If it's not working you probably havent started backend server
      <AccList refresh={refresh}></AccList>
      <Transaction refresh={refresh} setRefresh={setRefresh}></Transaction>
    </div>
  );
};

export default App;
