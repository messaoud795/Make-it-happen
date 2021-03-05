import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Loader } from "semantic-ui-react";
import { loadFields } from "../actions/field_actions";
import { loadQuote } from "../actions/loadQuote";
import Field from "../components/field/Field";
import ModalAddField from "../components/field/ModalAddField";
import { format } from "date-fns";

import "./FieldPage.css";
import { loadTodayActions } from "../actions/action_actions";
import Action from "../components/action/Action";

export default function FieldPage() {
  const dispatch = useDispatch();
  const { quote, author, loadingQuote } = useSelector((state) => state.quote);
  const { loadingField, name } = useSelector((state) => state.field);
  const { loadingAction, actions } = useSelector((state) => state.action);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  useEffect(() => {
    dispatch(loadQuote());
    dispatch(loadFields());
    dispatch(loadTodayActions());
  }, [dispatch]);
  const handleAddField = () => {
    setOpenModalAdd(!openModalAdd);
  };
  console.log(actions);
  return (
    <div className="FieldPage">
      {loadingQuote ? (
        <Loader active inline="centered" className="FieldPage__quote" />
      ) : (
        <div className="FieldPage__quote">
          <span className="FieldPage__quote-content">{quote}</span>
          <span className="FieldPage__quote-author">{author}</span>
        </div>
      )}
      <div className="FieldPage__content">
        <div className="FieldPage__sectionFields">
          <div className="FieldPage__sectionFields-header">
            <h1>Fields :</h1>
            <div onClick={handleAddField} className="iconAdd">
              <Icon name="add circle" />
            </div>
            <ModalAddField open={openModalAdd} setOpen={handleAddField} />
          </div>
          {loadingField ? (
            <Loader />
          ) : (
            <div className="FielPage__fields">
              {name?.map((el) => (
                <Field key={el._id} id={el._id} name={el.name} />
              ))}
            </div>
          )}
        </div>
        <div className="FieldPage__actions">
          <h2>{format(new Date(), "EEEE do LLL")}</h2>
          <h3>Today actions :</h3>
          {loadingAction ? (
            <Loader active inline="centered" />
          ) : (
            <div>
              {actions?.map((action) => (
                <Action key={action._id} data={action} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
