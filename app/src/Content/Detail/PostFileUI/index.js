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
  button : {
    marginRight : theme.spacing(2),
  }
}));

function PostFileUI(props) 
{
	const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState(undefined)

	function handleClose() 
	{
    setOpen(false);
  }

	function handleClick()
	{
    setOpen(true);
  }
  
  function handleFile(file)
  {
    if (file !== undefined)
    {
      setFile(file)
    }
    else
    {
      setFile(undefined)
    }
    
  }

	function handleUpload()
	{
    fetch('http://192.168.197.78:8080/abtest/'+props.id+'/analysis', { // Your POST endpoint
    method: 'POST',
    headers: {
      // Content-Type may need to be completely **omitted**
      // or you may need something
      'Content-Type': 'multipart/form-data',
    },
      body: file // This is your file object
    }).then(
      response => response.json() // if the response is a JSON object
    ).then(
      success => console.log(success) // Handle the success response object
    ).catch(
      error => console.log(error) // Handle the error response object
    );
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
            type="file"
            onChange={(e) => {handleFile(e.target.files[0])}}
					/>
					<label htmlFor="contained-button-file">
						<Button variant="contained" component="span" className={classes.button}>
							Browse
						</Button>
            {file !== undefined?file.name:"No file uploaded"}
					</label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={file===undefined} color="primary">
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