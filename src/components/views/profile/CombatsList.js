import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CombatLists = (props) => {
  const { text, setText, campaignFocus, setCampaignSwitch, campaignSwitch } =
    props;

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
    <>
      <textarea
        onBlur={putCampaign}
        onChange={addText}
        value={text}
      ></textarea>
    </>
  );
};

export default CombatLists;
