import axios from "axios";
import { useEffect, useState } from "react";

const AccList = ({ refresh }) => {
  const [accs, setAccs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/accounts")
      .then((elem) => {
        setAccs(elem.data);
        console.log(accs);
      })
      .catch((err) => {
        console.error("Error occured: ", err);
      });
  }, [refresh]);

  return (
    <ul>
      {accs.map((elem) => {
        return (
          <li key={elem.id}>
            <h1>Id: {elem.id}</h1>
            <p>Name: {elem.name}</p>
            <p>cardNumber: {elem.cardNumber}</p>
            <p>Balance: {elem.balance}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default AccList;
