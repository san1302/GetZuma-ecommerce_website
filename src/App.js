import "./App.css";
import React, { useEffect, useState } from "react";
import TableHeader from "./Components/TableHeader";
import SearchForm from "./Components/SearchForm";
export default function App() {
  const [items, setItems] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("https://fakestoreapi.com/products");
      try {
        const resData = await result.json();
        setItems(resData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <SearchForm
        searchCategory={searchCategory}
        searchTitle={searchTitle}
        setSearchTitle={setSearchTitle}
        setSearchCategory={setSearchCategory}
      />
      <table>
        <TableHeader items = {items} setItems = {setItems}/>
        <tbody>
          {items
            .filter((item) => {
              return searchCategory.toLowerCase() === ""
                ? true
                : item.category
                    .toLowerCase()
                    .includes(searchCategory.toLowerCase());
            })
            .filter((item) => {
              return searchTitle.toLowerCase() === ""
                ? true
                : item.title.toLowerCase().includes(searchTitle.toLowerCase());
            })
            .map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{`${item.rating.rate} (${item.rating.count})`}</td>
                  <td>
                    <img src={item.image} width="250px" alt={idx} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
