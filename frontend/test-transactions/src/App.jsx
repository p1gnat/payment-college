import { useState } from "react";
import AccList from "./components/AccList";
import Transaction from "./components/Transaction";
import GetTransactions from "./components/GetTransactions";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <AccList refresh={refresh}></AccList>
      <Transaction refresh={refresh} setRefresh={setRefresh}></Transaction>
      <GetTransactions refresh={refresh}></GetTransactions>
    </div>
  );
};

export default App;
