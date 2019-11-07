import React, {useState} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import './index.scss';
import { Formik } from 'formik';

function Feedback() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <Fab color="primary" aria-label="add" className="Feedback__fab" onClick={() => setOpen(true)}>
      <AddIcon />
    </Fab>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Feedback</DialogTitle>
    </Dialog>
    </>
  );
}

export default Feedback;
