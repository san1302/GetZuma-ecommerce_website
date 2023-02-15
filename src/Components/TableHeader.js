import React, { useState } from "react";
import { VscFoldUp, VscFoldDown, VscFold } from "react-icons/vsc";
function TableHeader({ items, setItems }) {
  const [headers, setHeaders] = useState([
    {
      Field: "id",
      SortingOrder: "NAN",
    },
    {
      Field: "price",
      SortingOrder: "NAN",
    },
    {
      Field: "rating",
      SortingOrder: "NAN",
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
    let newHeaders = [...headers].map((header) => {
      if (header.Field === field) return header;
      return {
        ...header,
        SortingOrder: "NAN",
      };
    });

    setHeaders(newHeaders);
    if (header.SortingOrder === "NAN" || header.SortingOrder === "DSC") {
      sorting("ASC", field);
      updateHeader(headerIndex, { SortingOrder: "ASC" });
    } else {
      sorting("DSC", field);
      updateHeader(headerIndex, { SortingOrder: "DSC" });
    }
  };

  const checkAscOrDscIcon = (field) => {
    let header = headers.find((header) => header.Field === field);
    
    if (header.SortingOrder === "NAN") return <VscFold />;
    if (header.SortingOrder === "ASC") return <VscFoldUp />;
    if (header.SortingOrder === "DSC") return <VscFoldDown />;
  };

  return (
    <thead>
      <tr>
        <th
          onClick={() => {
            sortField("id");
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Id
          {checkAscOrDscIcon("id")}
        </th>
        <th>Title</th>
        <th
          onClick={() => {
            sortField("price");
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Price {checkAscOrDscIcon("price")}
        </th>
        <th>Description</th>
        <th>Category</th>
        <th
          onClick={() => {
            sortField("rating");
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          Rating {checkAscOrDscIcon("rating")}
        </th>
        <th>Image</th>
      </tr>
    </thead>
  );
}

export default TableHeader;
