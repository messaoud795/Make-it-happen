import { parseISO } from "date-fns";
import { format } from "date-fns/esm";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Icon } from "semantic-ui-react";
import "./Partners.css";

export default function Partners() {
  const { partners } = useSelector((state) => state.goal);
  const history = useHistory();
  return (
    <div>
      <div className="partners">
        {partners?.map((partner) => (
          <div className="partner" key={partner._id}>
            <img
              src={
                partner?.image.startsWith("http")
                  ? `${partner?.image}`
                  : `https://make-it-happen-demo.herokuapp.com/${partner?.image}`
              }
              alt=""
              className="partner__img"
            />
            <div>
              <p className="partner__name">
                {partner.firstName + " " + partner.lastName}
              </p>
              <p className="partner__description">{partner.goal.description}</p>
              <span>
                {format(parseISO(partner.goal.startDate), "dd/MM/yyyy")}
                &nbsp;&nbsp;
                {format(parseISO(partner.goal.endDate), "dd/MM/yyyy")}
              </span>
            </div>
            <Icon
              name="chat"
              onClick={() => history.push(`/chat/${partner._id}`)}
              className="partner__chat"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
