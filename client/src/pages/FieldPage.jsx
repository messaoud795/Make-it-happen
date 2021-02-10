import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Loader } from "semantic-ui-react";
import { loadFields } from "../actions/field_actions";
import { loadQuote } from "../actions/loadQuote";
import Field from "../components/field/Field";
import ModalAddField from "../components/field/ModalAddField";
import "./FieldPage.css";

export default function FieldPage() {
  const dispatch = useDispatch();
  const { quote, author, loadingQuote } = useSelector((state) => state.quote);
  const { loadingField, name } = useSelector((state) => state.field);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  useEffect(() => {
    dispatch(loadQuote());
    dispatch(loadFields());
  }, [dispatch]);

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
      <div className="FieldPage__sectionFields">
        <div className="FieldPage__sectionFields-header">
          <h1>Fields :</h1>
          <div onClick={() => setOpenModalAdd(true)} className="iconAdd">
            <Icon name="add circle" />
          </div>
          <ModalAddField open={openModalAdd} setOpen={setOpenModalAdd} />
        </div>
        {loadingField ? (
          <Loader active inline="centered" />
        ) : (
          <div className="FielPage__fields">
            {name?.map((el) => (
              <Field key={el._id} id={el._id} name={el.name} />
            ))}
          </div>
        )}
      </div>
      {/* //actions of today */}
    </div>
  );
}
