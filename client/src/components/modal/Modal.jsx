import React, { useState } from "react";
import "./modal.css";
import axios from "axios";
import useSWR from "swr";
import { CreateTenderInFlow } from "../../Transactions/startProject";

const Modal = ({ setOpenModal }) => {
  const [tenderState, setTenderState] = useState({
    tender_id: "",
    _ipfsHash: "",
    _title: "",
    _description: "",
    _minimumExp: "",
    _exp: "",
    biddingLength: "",
    startPrice: "",
  });

  const handleValueChange = (fieldName, value) => {
    setTenderState((tenderState) => ({
      ...tenderState,
      [fieldName]: value,
    }));
  };

  const axiosConfig = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // const fetcher = (url) =>
  //   axios
  //     .get("http://localhost:5000/tender/id")
  //     .then((res) => handleValueChange("tender_id", res.data.message));

  // // Fetch tender id
  // const { data, error } = useSWR(
  //   tenderState.tender_id ? "http://localhost:5000/tender/id" : fetcher,
  //   null
  // );
  // if (error) {
  //   handleValueChange("tender_id", "error");
  //   // setOpenModal(false);
  // }

  // const createTender = async () => {
  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:5000/tender/create",
  //       tenderState,
  //       axiosConfig
  //     );
  //     console.log(data.message);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setOpenModal(false);
  //   }
  // };

  const handleCreateTender = async () => {
    await CreateTenderInFlow(
      tenderState._ipfsHash,
      tenderState._title,
      tenderState._description,
      tenderState._minimumExp,
      tenderState._exp,
      tenderState.biddingLength,
      tenderState.startPrice
    );
  };

  return (
    <>
      <div className="modal__background"></div>

      <div className="modal__container">
        <div className="admin__tender_inputs">
          <div className="admin__tender_inputs_left">
            <div className="left_first">
              <div className="tender">
                <input
                  className="tender_id"
                  type="text"
                  placeholder="ID"
                  value={tenderState.tender_id}
                  onChange={(e) =>
                    handleValueChange("tender_id", e.target.value)
                  }
                ></input>
              </div>

              <div className="tender">
                <input
                  className="tender_experience"
                  type="text"
                  placeholder="IPFS hash"
                  value={tenderState._ipfsHash}
                  onChange={(e) =>
                    handleValueChange("_ipfsHash", e.target.value)
                  }
                ></input>
                <input
                  className="tender_experience"
                  type="text"
                  placeholder="title "
                  value={tenderState._title}
                  onChange={(e) => handleValueChange("_title", e.target.value)}
                ></input>
              </div>
              <div className="tender">
                <input
                  className="tender_experience"
                  type="text"
                  placeholder="Minimum Experience Required"
                  value={tenderState._minimumExp}
                  onChange={(e) =>
                    handleValueChange("_minimumExp", e.target.value)
                  }
                ></input>
              </div>
            </div>

            <div className="tender">
              <input
                className="tender_title"
                type="text"
                placeholder="Exprience Provided"
                value={tenderState._exp}
                onChange={(e) => handleValueChange("_exp", e.target.value)}
              ></input>
            </div>

            <div className="left_third">
              <div className="left_third_dates">
                Bidding Length
                <input
                  className="tender_dates"
                  type="text"
                  name="opening"
                  value={tenderState.biddingLength}
                  onChange={(e) =>
                    handleValueChange("biddingLength", e.target.value)
                  }
                />
              </div>

              <div className="left_third_dates">
                <input
                  className="tender_dates"
                  type="text"
                  name="startPrice"
                  value={tenderState.startPrice}
                  onChange={(e) =>
                    handleValueChange("startPrice", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="admin__tender_inputs_right">
            <div className="admin__tender_inputs_right_description">
              <textarea
                rows="5"
                cols="20"
                name="description"
                placeholder="Description"
                value={tenderState._description}
                onChange={(e) =>
                  handleValueChange("_description", e.target.value)
                }
              ></textarea>
            </div>
          </div>
        </div>

        <div className="admin_text_button">
          <button
            className="admin__submit"
            onClick={() => {
              //createTender();
              handleCreateTender();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
