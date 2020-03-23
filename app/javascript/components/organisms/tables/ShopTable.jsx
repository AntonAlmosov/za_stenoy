import React from "react";
import axios from "axios";

import { DeleteButton } from "../../molecules/buttons/TableButtons.jsx";

export default function ShopTable(props) {
  return (
    <div
      style={{
        marginTop: "4em",
      }}
    >
      <ProductsTable />
    </div>
  );
}

function ProductsTable() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("/product/get_products").then(res => {
      setProducts(res.data.products);
    });
  };

  const destroyProducts = id => {
    axios.delete("/admin/shop/product/" + id).then(res => {
      setProducts(res.data.products);
    });
  };

  return (
    <div className="table-wrapper" style={{ marginTop: "3em" }}>
      <ProjectsTableHeader />
      {products.map(product => {
        return (
          <ProjectsTableRow
            key={product.id}
            title={product.name}
            actions={[
              {
                name: "Редактировать товар >",
                uri: "/admin/shop/product/" + product.id + "/edit",
              },
              { name: "Удалить", uri: () => destroyProducts(product.id) },
            ]}
          />
        );
      })}
    </div>
  );
}

function ProjectsTableHeader() {
  return (
    <div className="table-header-wrapper">
      <h2 style={{ width: "22em" }}>Товары</h2>
      <h2 style={{ width: "38em" }}>Быстрые действия</h2>
    </div>
  );
}

function ProjectsTableRow(props) {
  return (
    <div className="table-row-wrapper">
      <div className="column" style={{ width: "22em" }}>
        <span>{props.title}</span>
      </div>
      <div className="column" style={{ width: "38em" }}>
        {props.actions.map(action => {
          if (action.name !== "Удалить")
            return (
              <a href={action.uri} key={action.uri}>
                {action.name}
              </a>
            );
          else {
            return <DeleteButton key={action.name} uri={action.uri} />;
          }
        })}
      </div>
    </div>
  );
}
