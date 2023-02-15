import React, { useState } from "react";

function TableHeader({ items, setItems }) {
  const [headers, setHeaders] = useState([
    {
      Field: "id",
      SortingOrder: "ASC",
      isSortable: true,
    },
    {
      Field: "title",
      SortingOrder: "ASC",
      isSortable: false,
    },
    {
      Field: "price",
      SortingOrder: "ASC",
      isSortable: true,
    },
    {
      Field: "description",
      SortingOrder: "ASC",
      isSortable: false,
    },
    {
      Field: "category",
      SortingOrder: "ASC",
      isSortable: false,
    },
    {
      Field: "rating",
      SortingOrder: "ASC",
      isSortable: true,
    },
    {
      Field: "image",
      SortingOrder: "ASC",
      isSortable: false,
    },
  ]);

  const sorting = (sortingOrder, field) => {
    if (sortingOrder === "ASC") {
      const newItems = [...items].sort((a, b) => {
        if (field === "rating") {
          if (a[field]["rate"] === b[field]["rate"]) {
            return a[field]["count"] < b[field]["count"] ? 1 : -1;
          }
          return a[field]["rate"] < b[field]["rate"] ? 1 : -1;
        }

        return a[field] < b[field] ? 1 : -1;
      });
      setItems(newItems);
    } else {
      const newItems = [...items].sort((a, b) => {
        if (field === "rating") {
          if (a[field]["rate"] === b[field]["rate"]) {
            return a[field]["count"] > b[field]["count"] ? 1 : -1;
          }
          return a[field]["rate"] > b[field]["rate"] ? 1 : -1;
        }
        return a[field] > b[field] ? 1 : -1;
      });
      setItems(newItems);
    }
  };

  const updateHeader = (headerIndex, headerAttributes) => {
    console.log(headerIndex);
    setHeaders([
      ...headers.slice(0, headerIndex),
      Object.assign({}, headers[headerIndex], headerAttributes),
      ...headers.slice(headerIndex + 1),
    ]);
  };

  const sortField = (field) => {
    let header = headers.find((header) => header.Field === field);
    let headerIndex = headers.findIndex((header) => header.Field === field);
    if (header.isSortable) {
      if (header.SortingOrder === "ASC") {
        sorting("ASC", field);
        updateHeader(headerIndex, { SortingOrder: "DSC" });
      } else {
        console.log("Hello");
        sorting("DSC", field);
        updateHeader(headerIndex, { SortingOrder: "ASC" });
      }
    }
  };

  return (
    <thead>
      <tr>
        <th
          onClick={() => {
            sortField("id");
          }}
        >
          Id
        </th>
        <th>Title</th>
        <th
          onClick={() => {
            sortField("price");
          }}
        >
          Price
        </th>
        <th>Description</th>
        <th>Category</th>
        <th
          onClick={() => {
            sortField("rating");
          }}
        >
          Rating
        </th>
        <th>Image</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
