import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "semantic-ui-react";
import { loadFields } from "../actions/field_actions";
import { loadQuote } from "../actions/loadQuote";
import Field from "../components/Field";
import "./FieldPage.css";

export default function FieldPage() {
  const dispatch = useDispatch();
  const { quote, author } = useSelector((state) => state.quote);
  const { loadingField, name } = useSelector((state) => state.field);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    dispatch(loadQuote());
    dispatch(loadFields());
  }, [dispatch]);

  return (
    <div className="FieldPage">
      {loading ? (
        <Loader active inline="centered" className="FieldPage__quote" />
      ) : (
        <div className="FieldPage__quote">
          <span className="FieldPage__quote-content">{quote}</span>
          <span className="FieldPage__quote-author">{author}</span>
        </div>
      )}
      <div>
        <h1>Fields :</h1>
        {loadingField ? (
          <Loader active inline="centered" />
        ) : (
          <div className="FielPage__fields">
            {name?.map((el) => (
              <Field name={el.name} />
            ))}
          </div>
        )}
      </div>
      {/* //actions of today */}
    </div>
  );
}
