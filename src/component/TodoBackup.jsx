import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Container } from "react-bootstrap";

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
  const [isEditItem, SetIsEditItem] = useState(null)

  // Set Item in Local Storage

  useEffect(() => {
    localStorage.setItem("ItemList", JSON.stringify(items));
  }, [items]);

  // Add Item on Click

  const handleAddItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else if(inputData && !toggleEdit) {
        SetItems(items.map((element)=> {
            if (element.key === isEditItem) {
                return {...element, name: inputData}
            }
            return element;
        }));
        SetInputData("");
        SetToggleEdit(true)
        SetIsEditItem(null)
    }
     else {
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
    SetToggleEdit(false)
    SetIsEditItem(index)
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
          SetItems(items.map((element) => {
            if (element.key === isEditItem) {
              return { ...element, name: inputData };
            }
            return element;
          }));
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
  };

  return (
    <>
      <div className="main_wrap">
        <Container>
          <Form>
            <figure className="text-center mb-4">
              <img
                src="../images/todo.svg"
                className="figure-img mb-4"
                alt="Todo Logo"
              />
              <figcaption className="text-white h4">
                📝 Add Your List Here
              </figcaption>
            </figure>
            <div className="add_items mb-5">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="✍  Add Items..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  className="border-end-0"
                  onChange={(e) => SetInputData(e.target.value)}
                  value={inputData}
                  onKeyDown={(e) => handleKeyDown(e)}
                />

                {toggleEdit ? (
                  <Button
                    className="bg-white border-0 text-dark"
                    type="button"
                    onClick={handleAddItem}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddItem}
                    className="bg-white border-0 text-dark"
                    type="button"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Button>
                )}
              </InputGroup>
            </div>
            {items.map((element) => {
              return (
                <div className="show_item" key={element.key}>
                  <div className="list_item d-flex text-white rounded py-2 px-3 mb-3 align-items-center">
                    <h6 className="mb-0">{element.name}</h6>
                    <div className="ms-auto">
                      <Button
                        onClick={() => handleEditItem(element.key)}
                        className="p-2 bg-transparent border-0"
                        type="button"
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Button>
                      <Button
                        onClick={() => handleDeleteItem(element.key)}
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
              <Button
                type="button"
                className="btn_remove"
                onClick={handleRemoveAll}
              >
                Remove All
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Todo;
