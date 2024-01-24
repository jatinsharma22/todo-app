import React from "react";
import { Button } from "react-bootstrap";

const ItemList = ({
  listItem,
  editItem,
  deleteItem,
  isEditItem,
  removeItem,
}) => {
  return (
    <>
      {listItem.map((element) => {
        return (
          <div
            className={`show_item ${
              isEditItem === element.key ? "active_edit_item" : ""
            }`}
            key={element.key}
          >
            <div className="list_item d-flex text-white rounded py-2 px-3 mb-3 align-items-center">
              <h6 className="mb-0">{element.name}</h6>
              <div className="ms-auto">
                <Button
                  onClick={() => editItem(element.key)}
                  className="p-2 bg-transparent border-0"
                  type="button"
                >
                  <i className="fa-regular fa-pen-to-square"></i>
                </Button>
                <Button
                  onClick={() => deleteItem(element.key)}
                  className="p-2 pe-0 bg-transparent border-0"
                  type="button"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </Button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-5 text-center">
        <Button type="button" className="btn_remove" onClick={removeItem}>
          Remove All
        </Button>
      </div>
    </>
  );
};

export default ItemList;
