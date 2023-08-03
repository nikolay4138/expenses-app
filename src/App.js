import React, { useState, useEffect } from "react";
import axios from "axios";
import { uuid } from "./helpers/uuid";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  function handleAdd() {
    postData();
  }
  function handleGet() {
    getData();
  }

  const postData = (object = "Car", expense = 35) => {
    axios
      .post(`http://localhost:3030/Nikolay`, {
        id: uuid(),
        subject: object,
        expenses: expense,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/Nikolay", requestOptions)
      .then((response) => response.json())
      .then((result) => setExpenses(result))
      .catch((error) => console.log("error", error));
  };
  // const values = expenses.map((expense) => {
  //   return {}
  // })
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {expenses?.map((expense) => (
        <div>
          <h3>
            <span>{expense.subject}</span>
            <button onClick={handleAdd}>ADD</button>
            <button onClick={handleGet}>GET</button>
          </h3>
          <p>{expense.expenses}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
