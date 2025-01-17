import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const schema = yup.object().shape({
  senderCardNumber: yup
    .string()
    .required("Sender is required")
    .matches(
      /^\d{4}-\d{4}-\d{4}-\d{4}$/,
      "Sender card number must be in format 1234-5678-9012-3456"
    ),
  receiverCardNumber: yup
    .string()
    .required("Receiver is required")
    .matches(
      /^\d{4}-\d{4}-\d{4}-\d{4}$/,
      "Receiver card number must be in format 1234-5678-9012-3456"
    ),
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .typeError("Amount must be a number"),
});

const Transaction = ({ refresh, setRefresh }) => {
  let [errorSubmit, setErrorSubmit] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setRefresh((refresh) => !refresh);
    console.log("Form Data:", data);

    try {
      await axios.post("http://localhost:3000/transfer", data);
      setErrorSubmit("");
    } catch (err) {
      setErrorSubmit(err.message);
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="Sender"
          {...register("senderCardNumber")}
        />
        <p class="message message-error">{errors.sender?.message}</p>
      </div>

      <div>
        <input
          type="text"
          placeholder="Receiver"
          {...register("receiverCardNumber")}
        />
        <p class="message message-error">{errors.receiver?.message}</p>
      </div>

      <div>
        <input type="text" placeholder="Amount" {...register("amount")} />
        <p class="message message-error">{errors.amount?.message}</p>
      </div>

      <button type="submit">Submit</button>
      {errorSubmit && <p class="message message-error">{errorSubmit}</p>}
    </form>
  );
};

export default Transaction;
