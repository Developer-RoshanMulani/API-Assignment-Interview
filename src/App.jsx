import { useEffect, useState } from "react";
import { getAlbums } from "./services/albumServices";
import "./App.css";

function App() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAlbums()
      .then((res) => {
        setIsLoading(false);
        let result = Object.values(
          res.reduce((acc, current) => {
            acc[current.albumId] = acc[current.albumId] ?? [];
            acc[current.albumId].push(current);
            return acc;
          }, {})
        );
        setAlbums(result);
        console.log(result);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMsg("Failed to load albums");
      });
  }, []);

  const handleSelectedAlbum = (albumId) => {
    // console.log(albumId);
    setSelectedAlbum(albums[albumId - 1]);
    setIsModalOpen(true);
    const modal = new window.bootstrap.Modal(document.getElementById("modal"));
    modal.show();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum([]);
  };
  return (
    <>
      {!isError && isLoading ? (
        <span> Loading... </span>
      ) : (
        <div className="container">
          <div className="row">
            {albums &&
              albums.map((album, index) => (
                <div className="col-lg-3 col-md-2 col-sm-3 ">
                  <div
                    key={index}
                    className="card album-card"
                    style={{ width: "18rem", backgroundColor: "aqua" }}
                    onClick={() => handleSelectedAlbum(index + 1)}
                  >
                    <div className="card-body">
                      <p>Album : {index + 1}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* {isModalOpen && ( */}
          <div
            className="modal fade"
            id="modal"
            tabIndex="-1"
            aria-labelledby="modalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="modalLabel">
                    Album Photos
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => closeModal()}
                  ></button>
                </div>
                <div className="modal-body">
                  {selectedAlbum ? (
                    <>
                      <div className="row">
                        {selectedAlbum.map((album, index) => (
                          <div className="col-md-6">
                            <div key={index} className="card album-photos">
                              <div className="card-body">
                                <img
                                  className="album-photo"
                                  src={album.url}
                                  alt=""
                                />
                                <p>{album.title}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    "Loading..."
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      )}
      {isError && (
        <div className="error">
          <span>{errorMsg}</span>
        </div>
      )}
    </>
  );
}

export default App;
