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
import CareerIcon from "../icons/CareerIcon";
import FinanceIcon from "../icons/FinanceIcon";
import HealthIcon from "../icons/HealthIcon";
import FunIcon from "../icons/FunIcon";
import GrowthIcon from "../icons/GrowthIcon";
import RelationsIcon from "../icons/RelationsIcon";

export default function FieldPage() {
  const dispatch = useDispatch();
  const { quote, author, loadingQuote } = useSelector((state) => state.quote);
  const { loadingField, name } = useSelector((state) => state.field);
  const { loadingAction, todayActions, completedActionsOfToday } = useSelector(
    (state) => state.action
  );
  const [openModalAdd, setOpenModalAdd] = useState(false);

  useEffect(() => {
    dispatch(loadQuote());
    dispatch(loadFields());
    dispatch(loadTodayActions());
  }, [dispatch]);

  const handleAddField = () => {
    setOpenModalAdd(!openModalAdd);
  };
  const fieldsIcons = {
    CAREER: CareerIcon,
    FINANCE: FinanceIcon,
    HEALTH: HealthIcon,
    GROWTH: GrowthIcon,
    LEISURE: FunIcon,
    RELATIONS: RelationsIcon,
  };
  return (
    <div className="FieldPage">
      <h3> {format(new Date(), "EEEE dd MMMM")}</h3>
      {loadingQuote ? (
        <Loader active inline="centered" className="FieldPage__quote" />
      ) : (
        <div className="FieldPage__quote">
          <span className="FieldPage__quote-content">
            {quote.length === 0
              ? "You are never too old to set another goal or to dream a new dream."
              : quote}
          </span>
          <span className="FieldPage__quote-author">
            {author.length === 0 ? "C.S LEWIS" : author}
          </span>
        </div>
      )}

      <div className="FieldPage__content">
        <div className="FieldPage__sectionFields">
          <div className="FieldPage__sectionFields-header">
            <h2>Life Areas :</h2>
            <div onClick={handleAddField} className="iconAdd">
              <Icon name="add circle" />
            </div>
            <ModalAddField open={openModalAdd} setOpen={handleAddField} />
          </div>
          {loadingField ? (
            <Loader active className="spinner" />
          ) : (
            <div className="FielPage__fields">
              {name?.map((el) => (
                <Field key={el._id} id={el._id} name={el.name}>
                  {React.createElement(fieldsIcons[el.name], {})}
                </Field>
              ))}
            </div>
          )}
        </div>
        <div className="FieldPage__actions">
          <h2>
            Today actions done: {completedActionsOfToday} /{" "}
            {todayActions?.length}
          </h2>

          {loadingAction ? (
            <Loader active className="spinner" />
          ) : (
            <div>
              {todayActions?.map((action) => (
                <Action key={action._id} data={action} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
