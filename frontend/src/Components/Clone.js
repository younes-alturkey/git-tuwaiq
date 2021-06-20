import React, { useState, useEffect } from "react";
import {Container,Modal,FormControl,InputGroup} from "react-bootstrap";
import { VscRepoClone, VscChromeClose,VscCloudDownload } from "react-icons/vsc";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { ButtonToolbar,IconButton, Drawer ,Button,Icon } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'

const Clone = () => {
  const loggedUser = JSON.parse(localStorage.getItem("User"));
  const history = useHistory();
  if (!loggedUser) history.push("/auth");
  const [show, setShow] = useState(()=>false);
  const [textClone, setTextClone] = useState(()=>null);

  const handleClose = () => setShow((prev)=> prev = false);
  const handleShow = () => setShow((prev)=> prev = true);

  const postClone = ()=> {
     axios.post("/api/repos/clone?url="+textClone)
     .then((res)=>{
             console.log(res);
     }).catch(err=>{
         console.log("err:", err);
     })
};

const close = () => {
  setShow((prev)=> prev = false)
}
const open = () => {
  console.log("99999999999999999999");
  setShow((prev)=> prev = true)
}

const toggleDrawer = (placement) => {
  setShow((prev)=> prev = true)
}
  return (
    <>
    
      <VscRepoClone
        style={{
          color: "white",
          fontSize: "25px",
          marginTop: "13px",
          marginRight: "20px",
        }}
        onClick={()=>open()}
      />

<div className="modal-container">
{/* <ButtonToolbar>
<IconButton
            icon={<Icon icon="angle-up" />}
            onClick={() => toggleDrawer('bottom')}
          >
            Bottom
          </IconButton>
        </ButtonToolbar> */}

        <Drawer size={'xs'} full show={show} onHide={close}>
          <Drawer.Header>
            <Drawer.Title>Clone remote Repo</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            {/* <FormControl
              placeholder="https://github.com/torvalds/linux.git"
              aria-label="clone"
              aria-describedby="basic-addon1"
            /> */}
            <input onChange={(e) => setTextClone(prev => prev = e.target.value)} type="text" className="form-control"  aria-describedby="emailHelp" placeholder="https://github.com/torvalds/linux.git" id="PostCloneName"/>

<InputGroup.Text onClick={()=>postClone()} id="basic-addon1"><VscCloudDownload/></InputGroup.Text>

<VscChromeClose onClick={handleClose} />
            
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={close} appearance="primary">
              Confirm
            </Button>
            <Button onClick={close} appearance="subtle">
              Cancel
            </Button>
          </Drawer.Footer>
        </Drawer>
      </div>
    </>
  );
};

export default Clone;
