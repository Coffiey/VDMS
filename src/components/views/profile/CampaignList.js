import "../Encounter/prep/enemy.css";
import "../../../App.css";
import "./profile.css";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CampaignList = (props) => {
  const {
    text,
    setText,
    name,
    setName,
    campaignList,
    setCampaignList,
    setCampaignFocus,
    setCampaignSwitch,
    campaignSwitch,
    campaignFocus,
  } = props;
  const { auth } = useAuth();
  const id = auth?.id;

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const getCampaign = async () => {
      try {
        const response = await axiosPrivate.get(`/db/${id}`);
        let sorted = await response.data.sort((a, b) => {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        });
        setCampaignList(sorted);
      } catch (err) {
        console.error(err);
      }
    };
    getCampaign();
    return () => {
      isMounted = false;
    };
  }, [campaignSwitch]);

  const postCampaign = async () => {
    if (id && name.length > 0) {
      try {
        await axiosPrivate.post(`/db/${id}`, {
          campaignName: name,
          notes: text,
        });
        setCampaignSwitch(!campaignSwitch);
        setName("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const addName = (e) => {
    setName(e.target.value);
  };

  const setNotes = (object) => {
    setCampaignFocus(object);
    setText(object.notes);
  };

  const check = async () => {
    const answer = window.confirm(
      "Are you sure you want to delete the campaign"
    );
    return answer;
  };

  const deleteCampaign = async (object) => {
    const checked = await check();
    if (checked) {
      try {
        await axiosPrivate.delete(`/db/${id}?id=${object.id}`);
        setCampaignSwitch(!campaignSwitch);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const navigateToEncounters = (object) => {
    if (object) {
      auth.campaign = { id: object.id, name: object.campaignName };
      navigate(`/profile/${object.id}`);
    } else {
      if (campaignFocus) {
        auth.campaign = { id: object.id, name: object.campaignName };
        navigate(`/profile/${campaignFocus.id}`);
      } else {
        window.alert("please select a Campaign");
      }
    }
  };

  return (
    <>
      <div className='Enemy'>
        <div className='combatBanner'>
          <img
            className='listTitle'
            src='/profile.png'
          />
          <button
            className='bannerButton'
            onClick={() => navigateToEncounters(false)}
          >
            {campaignFocus?.campaignName
              ? campaignFocus.campaignName
              : "Select Campaign"}
          </button>
        </div>
        <div
          className='CampaignCreateDiv'
          onClick={() => {
            setText("");
            setCampaignFocus(null);
          }}
        >
          {name.length > 0 ? (
            <h1 className='campaignItem'>{name}</h1>
          ) : (
            <h1 className='campaignItem'>Create A Campaign</h1>
          )}
          <p className='campaignItem'>
            Give it a Name{" "}
            <input
              onChange={addName}
              value={name}
            ></input>
            <button
              className='campaignButton'
              onClick={postCampaign}
            >
              Create
            </button>
          </p>
        </div>
        {campaignList &&
          campaignList.map((campaign) => {
            return (
              <div
                className='CampaignDiv'
                onClick={() => setNotes(campaign)}
                onDoubleClick={() => navigateToEncounters(campaign)}
              >
                <h1 class='campaignItem'>{campaign.campaignName}</h1>
                <p class='campaignItem'>Add some Campaign notes on the left.</p>
                <p class='campaignItem'>
                  <button
                    className='deleteButton'
                    onClick={() => deleteCampaign(campaign)}
                  >
                    Delete
                  </button>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CampaignList;
