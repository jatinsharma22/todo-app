import { useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
import TodoInput from "./TodoInput";
import ItemList from "./ItemList";
import TodoHeader from "./TodoHeader";

// Get Item from Local Storage
const getLocalItems = () => {
  let getItems = localStorage.getItem("ItemList");
  if (getItems) {
    return JSON.parse(getItems);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, SetInputData] = useState("");
  const [items, SetItems] = useState(getLocalItems());
  const [toggleEdit, SetToggleEdit] = useState(true);
  const [isEditItem, SetIsEditItem] = useState(null);

  // Set Item in Local Storage
  useEffect(() => {
    localStorage.setItem("ItemList", JSON.stringify(items));
  }, [items]);

  // Add Item on Click
  const handleAddItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else if (inputData && !toggleEdit) {
      SetItems(
        items.map((element) => {
          if (element.key === isEditItem) {
            return { ...element, name: inputData };
          }
          return element;
        })
      );
      SetInputData("");
      SetToggleEdit(true);
      SetIsEditItem(null);
    } else {
      const newItem = { key: new Date().getTime().toString(), name: inputData };
      SetItems([...items, newItem]);
      SetInputData("");
    }
  };

  // Edit Item
  const handleEditItem = (index) => {
    const findEditItem = items.find((element) => {
      return index === element.key;
    });
    SetInputData(findEditItem.name);
    SetToggleEdit(false);
    SetIsEditItem(index);
  };
 
  // Delete Item
  const handleDeleteItem = (id) => {
    const filterItem = items.filter((element) => {
      return id !== element.key;
    });
    SetItems(filterItem);
  };

  //   Add Item On Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!inputData) {
        alert("Please fill the data");
      } else {
        if (toggleEdit && !isEditItem) {
          // Add a new item
          const newItem = {
            key: new Date().getTime().toString(),
            name: inputData,
          };
          SetItems([...items, newItem]);
        } else if (!toggleEdit && isEditItem) {
          // Update an existing item
          SetItems(
            items.map((element) => {
              if (element.key === isEditItem) {
                return { ...element, name: inputData };
              }
              return element;
            })
          );
          SetToggleEdit(true);
          SetIsEditItem(null);
        }

        // Clear input field
        SetInputData("");
      }
    }
  };

  // Remove All Item
  const handleRemoveAll = () => {
    SetItems([]);
    SetInputData("");
  };

  return (
    <>
      <div className="main_wrap position-relative">
       <div className="position-absolute end-0 top-0 github p-5">
          <a href="https://github.com/jatinsharma22/todo-app" target="_blank"><img src="./images/github.svg" /></a>
        </div>
        <Container>
          <Form>
            <TodoHeader />
            <TodoInput
              SetInputData={SetInputData}
              inputData={inputData}
              enterFn={handleKeyDown}
              toggleBtn={toggleEdit}
              addItem={handleAddItem}
            />
            <ItemList
              listItem={items}
              editItem={handleEditItem}
              deleteItem={handleDeleteItem}
              isEditItem={isEditItem}
              removeItem={handleRemoveAll}
            />
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Todo;
