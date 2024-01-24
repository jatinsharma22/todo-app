import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const TodoInput = ({
  SetInputData,
  inputData,
  enterFn,
  toggleBtn,
  addItem,
}) => {
  return (
    <>
      <div className="add_items mb-5">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="✍  Add Items..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            className="border-end-0"
            onChange={(e) => SetInputData(e.target.value)}
            value={inputData}
            onKeyDown={(e) => enterFn(e)}
          />

          {toggleBtn ? (
            <Button
              className="bg-white border-0 text-dark"
              type="button"
              onClick={addItem}
            >
              <i className="fa-solid fa-plus"></i>
            </Button>
          ) : (
            <Button
              onClick={addItem}
              className="bg-white border-0 text-dark"
              type="button"
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </Button>
          )}
        </InputGroup>
      </div>
    </>
  );
};

export default TodoInput;
