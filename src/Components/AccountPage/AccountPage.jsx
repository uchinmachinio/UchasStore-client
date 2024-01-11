import { useEffect, useState } from "react";
import "./AccountPage.css";
import { fetchPersonalData, updatePersonalData } from "../../Utils/api";

function AccountPage() {
  useEffect(() => {
    fetchPersonalData()
      .then((usersPersonalData) => {
        setPersonalData(usersPersonalData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const [personalData, setPersonalData] = useState({});

  const [editableField, setEditableField] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setPersonalData({
      ...personalData,
      [name]: value,
    });
  }

  function handleInfoUpdate() {
    updatePersonalData(personalData)
      .then((message) => console.log(message))
      .catch((err) => console.log(err));
  }

  return (
    <>
      {loading ? (
        <div className="loading-info">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="info-div">
          {Object.keys(personalData).map((info) => {
            return (
              <div className="info-input" key={info}>
                <label htmlFor={info}>{info}</label>
                <div>
                  <input
                    type="text"
                    name={info}
                    placeholder="add"
                    value={personalData[info] || ""}
                    onChange={handleInputChange}
                    readOnly={editableField !== info}
                  />
                  <button
                    className={editableField !== info ? "edit-btn" : "save-btn"}
                    onClick={() => {
                      if (editableField === null) {
                        setEditableField(info);
                      } else {
                        setEditableField(null);
                        handleInfoUpdate();
                      }
                    }}
                  >
                    {editableField === info ? (
                      "save"
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default AccountPage;
