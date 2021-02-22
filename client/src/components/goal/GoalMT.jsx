import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import ModalDeleteGoal from "./ModalDeleteGoal";
import ModalEditGoal from "./ModalEditGoal";
import ModalAddGoal from "./ModalAddGoal";
import { useSelector } from "react-redux";
import "./GoalMT.css";

export default function GoalMT({ data }) {
  //   const [openModalEdit, setOpenModalEdit] = useState(false);
  //   const [openModalDelete, setOpenModalDelete] = useState(false);
  //   const [openModalAdd, setOpenModalAdd] = useState(false);
  const { description, startDate, endDate } = data;
  //   const { goals } = useSelector((state) => state.goal);

  //   const handleModalDelete = () => {
  //     setOpenModalDelete(!openModalDelete);
  //   };
  //   const handleModalEdit = () => {
  //     setOpenModalEdit(!openModalEdit);
  //   };
  //   const handleModalAdd = () => {
  //     setOpenModalAdd(!openModalAdd);
  //   };
  return (
    <div>
      <div className="GoalMT-add">
        <div className="GoalMT__content">
          <div className="Goal__operations">
            <div>
              <Icon name="edit" className="edit" />
            </div>
            {/* <ModalEditGoal
          openModalEdit={openModalEdit}
          handleModalEdit={handleModalEdit}
          GoalData={data}
        /> */}
            <div>
              <Icon name="delete" className="delete" />
            </div>
            {/* <ModalDeleteGoal
          openModalDelete={openModalDelete}
          handleModalDelete={handleModalDelete}
          GoalData={data}
        /> */}
          </div>

          <p className="Goal__description">{description}</p>
          <div className="Goal__time">
            <span>{startDate}</span>
            <span>{endDate}</span>
          </div>
        </div>
        <button>add a short term goal</button>
        {/* <ModalAddGoal
        open={openModalAdd}
        setOpen={handleModalAdd}
        fieldId={data.fieldId}
        category="mid term"
        parentId={data._id}
      /> */}
      </div>
      {/* {goals
        ?.filter((goal) => goal.category === "mid term")
        .map((goal) => (
          <GoalMT key={goal._id} data={{ ...goal }} />
        ))} */}
    </div>
  );
}
