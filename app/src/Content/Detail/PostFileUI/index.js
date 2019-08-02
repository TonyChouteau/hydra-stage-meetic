import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  input: {
    display: 'none',
  },
}));

function PostFileUI(props) 
{
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	function handleUpload()
	{

	}

	function handleClose() 
	{
    setOpen(false);
  }

	function handleClick()
	{
    setOpen(true);
	}

	return (
		<div>
			<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Upload an analysis for the ABtest "+props.id}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Browse into your computer then click 'Upload' to upload the analysis file :
          </DialogContentText>
					<input
						className={classes.input}
						id="contained-button-file"
						multiple
						type="file"
					/>
					<label htmlFor="contained-button-file">
						<Button variant="contained" component="span" className={classes.button}>
							Browse
						</Button>
					</label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
			<Tooltip title="Add an analysis" aria-label="add" onClick={handleClick}>
				<Fab color="secondary" className={classes.absolute}>
					<AddIcon />
				</Fab>
			</Tooltip>
		</div>
	);
}

export default PostFileUI;