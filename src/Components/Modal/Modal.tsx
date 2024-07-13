import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { closeModal } from "../../store/actions/userSlice"; 
import styles from "./Modal.module.css";

const UserModal: React.FC = () => {
  const modalOpen = useSelector((state: RootState) => state.user.modalOpen);
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!userDetails) return null;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0.5px solid #000",
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <Box sx={style} className={styles.modalContent}>
        <button onClick={handleClose} className={styles.closeButton}>
          Close
        </button>
        <img
          src={userDetails.avatar_url}
          alt={userDetails.login}
          className={styles.avatar}
        />
        <h2 id="user-modal-title">{userDetails.name || userDetails.login}</h2>
        <p>{userDetails.location}</p>
        <p>Followers: {userDetails.followers}</p>
        <p>Following: {userDetails.following}</p>
      </Box>
    </Modal>
  );
};

export default UserModal;
