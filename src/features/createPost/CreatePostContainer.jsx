import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CreatePostForm from "./CreatePostForm";

function CreatePostContainer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between pt-5 pb-3">
        <div className="invisible">x</div>

        <div>
          <Button bg="yellow" onClick={() => setOpen(true)}>
            Make your own post
          </Button>
        </div>
      </div>

      <Modal
        title="Create new post"
        width="55"
        open={open}
        onClose={() => setOpen(false)}
        textsize="three"
      >
        <CreatePostForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}

export default CreatePostContainer;
