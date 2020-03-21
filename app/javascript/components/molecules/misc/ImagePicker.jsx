import React from "react";

export default ({ width, height, cover, setCover, style, imageStyle }) => {
  const containerStyle = style ? style : {};
  const imgStyle = imageStyle ? imageStyle : {};

  return (
    <div
      style={{
        width: width,
        height: height,
        position: "relative",
        ...containerStyle,
      }}
    >
      {cover && (
        <img
          src={cover}
          style={{
            width: width,
            height: height,
            objectFit: "contain",
            objectPosition: "center center",
            ...imgStyle,
          }}
        />
      )}
      <div
        style={{
          width: width,
          height: height,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <input
          className="cover_image_input"
          type="file"
          id={"cover"}
          accept="image/*"
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              var reader = new FileReader();

              reader.onload = function(el) {
                setCover(el.target.result);
              };
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
          style={{ display: "none" }}
        />
        {!cover && (
          <label
            htmlFor={"cover"}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              border: "2px solid #b3b3b3",
              backgroundColor: "rgba(0,0,0,0)",
              cursor: "pointer",
            }}
          >
            <div style={{ color: "#b3b3b3" }}>Добавить обложку ></div>
          </label>
        )}
        {cover && (
          <label
            htmlFor={"cover"}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              backgroundColor: "rgba(0,0,0,0)",
              cursor: "pointer",
            }}
            className="show-on-hover"
          >
            <div style={{ color: "#b3b3b3" }}>Изменить обложку ></div>
          </label>
        )}
      </div>
    </div>
  );
};
