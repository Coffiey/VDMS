import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CombatLists = (props) => {
  const {
    text,
    setText,
    campaignFocus,
    setCampaignSwitch,
    campaignSwitch,
    name,
  } = props;

  const { auth } = useAuth();
  const userId = auth?.id;
  const axiosPrivate = useAxiosPrivate();

  const addText = (e) => {
    setText(e.target.value);
  };

  const putCampaign = async () => {
    if (userId && campaignFocus?.campaignName?.length > 0) {
      try {
        await axiosPrivate.put(`/db/${userId}?id=${campaignFocus.id}`, {
          campaignName: campaignFocus.campaignName,
          notes: text,
        });
        setCampaignSwitch(!campaignSwitch);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className='textDiv'>
      <div className='notesDiv'>
        <p className='textTitle'>
          Campaign:{" "}
          {campaignFocus?.campaignName ? (
            <strong>{campaignFocus.campaignName}</strong>
          ) : (
            <strong>{name}</strong>
          )}
        </p>
      </div>

      <textarea
        className='textInfo'
        onBlur={putCampaign}
        onChange={addText}
        value={text}
      ></textarea>
    </div>
  );
};

export default CombatLists;
