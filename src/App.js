import "./App.css";
import React, { useEffect, useState } from "react";
import TableHeader from "./components/tableHeader";
import SearchForm from "./components/searchForm";
export default function App() {
  const [items, setItems] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((resData) => {
        setItems(resData);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {loading && (
        <h1 style={{ textAlign: "center" }}>Loading please wait......</h1>
      )}
      {items.length > 0 && (
        <SearchForm
          searchCategory={searchCategory}
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          setSearchCategory={setSearchCategory}
        />
      )}
      {items.length > 0 && (
        <table>
          <TableHeader items={items} setItems={setItems} />
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
                  : item.title
                      .toLowerCase()
                      .includes(searchTitle.toLowerCase());
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
      )}
    </div>
  );
}
