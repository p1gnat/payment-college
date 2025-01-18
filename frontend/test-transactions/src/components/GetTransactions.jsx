import axios from "axios";
import { useEffect, useState } from "react";

const GetTransactions = ({ refresh }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/transactions")
      .then((elem) => {
        setTransactions(elem.data);
        console.log(accs);
      })
      .catch((err) => {
        console.error("Error occured: ", err);
      });
  }, [refresh]);

  return (
    <>
      <h2 style={{ marginTop: "50px" }}>Recent transactions</h2>
      <ol>
        {transactions.map((elem) => {
          return (
            <li key={elem.timeStamp}>
              <p>Sender: {elem.sender}</p>
              <p>Receiver: {elem.receiver}</p>
              <p>Amount: {elem.amount}</p>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default GetTransactions;
