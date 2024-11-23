import React from "react";
import "./leaf.scss"

// Simple component to render inline formatting with slate
function Leaf(props) {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? "bold" : "normal",
                fontStyle: props.leaf.italic ? "italic": "",
                textDecoration: `${props.leaf.underline ? "underline" : ""}
                                      ${props.leaf.strikethrough ? "line-through" : ""}`,
                fontSize: `${props.leaf.h1 ? "3rem": ""}
                           ${props.leaf.h2 ? "2.5rem": ""}
                           ${props.leaf.h3 ? "2rem": ""}`}}
        >
      {props.children}
    </span>
    )
}
export default Leaf
