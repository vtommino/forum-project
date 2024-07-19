import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import RegisterForm from "./RegisterForm";

export default function RegisterContainer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="text-center">
        <Button bg="green" onClick={() => setOpen(true)}>
          Create new account
        </Button>
      </div>
      <Modal
        title="Register for Vtara36 Forum"
        open={open}
        onClose={() => setOpen(false)}
        textsize="two"
      >
        <RegisterForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
