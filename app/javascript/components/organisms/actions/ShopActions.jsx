import React from "react";
import DefaultLinkButton from "../../molecules/buttons/DefaultLinkButton.jsx";

export default function ShopActions() {
  return (
    <div className="buttons-wrapper">
      <DefaultLinkButton
        uri={"/admin/shop/product/new"}
        text={"Новый продукт"}
      />
    </div>
  );
}
