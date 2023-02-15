import "./App.css";
import React, { useEffect, useState } from "react";
export default function App() {
  const [items, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://fakestoreapi.com/products");
      result
        .json()
        .then((resData) => {
          setItem(resData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{`${item.rating.rate} (${item.rating.count})`}</td>
                <td>
                  <img src={item.image} width = "250px" alt={idx} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
