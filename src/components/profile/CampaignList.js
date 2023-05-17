import "../css/enemy.css";
import "../../App.css";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
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
  } = props;
  const { auth } = useAuth();
  const id = auth?.id;

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getCampaign = async () => {
      try {
        const response = await axiosPrivate.get(`/db/${id}`, {
          signal: controller.signal,
        });
        console.log(response.data);
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
    const controller = new AbortController();
    if (id && name.length > 0) {
      try {
        await axiosPrivate.post(
          `/db/${id}`,
          {
            campaignName: name,
            notes: text,
          },
          {
            signal: controller.signal,
          }
        );
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

  //   const deleteEnemy = async (index) => {
  //     const controller = new AbortController();
  //     try {
  //       await axiosPrivate.delete(
  //         `/db/enemy?monsterReference=${index.monsterReference}`,
  //         {
  //           signal: controller.signal,
  //         }
  //       );
  //     } catch (err) {
  //       console.error(err);
  //       controller.abort();
  //     }
  //   };

  // useEffect(() => {
  //   // if (monsterObj2) {
  //   //   setmonsterObj(monsterObj2);
  //   // }
  // }, [monsterObj2]);

  // useEffect(() => {
  //   // if (monsterArray.length !== 0) {
  //   //   let [item] = list.filter((monster) => {
  //   //     return monster.name === monsterArray[0].monsterName;
  //   //   });
  //   //   axios
  //   //     .get(`/api/monster/object?url=${item.url}`)
  //   //     .then((response) => {
  //   //       setmonste-rObj(response.data);
  //   //     })
  //   //     .catch(function (error) {});
  //   // }
  // }, [disableInput]);
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

  const navigateToCombat = () => {
    navigate("/combat", { replace: true });
  };
  return (
    <>
      <div className='Enemy'>
        <div className='combatBanner'>
          <button>Set Initative</button>
          <p>Initative Set</p>
          <button>Next Turn</button>
          <p>
            <strong>Round: 9</strong>
          </p>
          <button onClick={navigateToCombat}>Begin Combat</button>
        </div>
        <div
          className='enemyDiv'
          onClick={() => {
            setText("");
            setCampaignFocus({});
          }}
        >
          {name.length > 0 ? <h1>{name}</h1> : <h1>Create A Campaign</h1>}
          <p>
            Give it a Name{" "}
            <input
              onChange={addName}
              value={name}
            ></input>
          </p>
          <button onClick={postCampaign}>+</button>
        </div>
        {campaignList &&
          campaignList.map((campaign) => {
            return (
              <div
                className='enemyDiv'
                onClick={() => setNotes(campaign)}
              >
                <h1>{campaign.campaignName}</h1>
                <p>Add some Campaign notes on the left</p>
                <p>
                  Delete Campaign:{" "}
                  <button onClick={() => deleteCampaign(campaign)}>
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
