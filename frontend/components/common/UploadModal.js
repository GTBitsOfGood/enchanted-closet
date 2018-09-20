import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadUserImage, uploadEventImage } from '../../actions/index';

import { Button, Container, Form, Header, Modal, Reveal } from 'semantic-ui-react'

// Upload Modal - Wrapper - todo: validate filesize
class UploadModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onChange = this.onChange.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.props.type.toLowerCase() === "user")
      this.props.uploadUserImage(this.state);
    else {
      this.props.uploadEventImage(this.state, this.props.id);
    }
  }

  onChange(e) {
    this.setState({file:e.target.files[0]});
  }

  render() {
    const { children, id, type } = this.props;
    const { file } = this.state;
    // process filename real fast
    const label = file ?
      (file.name.length > 14 ?
       file.name.substr(0, 4) + "..." + file.name.substr(-7) : file.name) : "Select a File";
    /* // Bugged
    const trigger = (
      <Reveal animated="fade">
  <Reveal.Content visible>
    {children}
  </Reveal.Content>
  <Reveal.Content hidden>
    <Container>
      Tests
    </Container>
  </Reveal.Content>
      </Reveal>
    );
    */
    return (
      <Modal trigger={children}>
  <Modal.Header>
    {type.toLowerCase() === "user" ?
     "Profile Picture Upload" : "Event Image Upload"}
  </Modal.Header>
  <Modal.Description>
    <Container style={styles.modalContentWrap}>
            <Form onSubmit={e => this.onFormSubmit(e)}>
        <input style={styles.fileStyle}
         name="file" id="file"
         type="file" onChange={this.onChange}
         accept="image/*"
        />
        <label htmlFor="file" style={styles.labelStyle}>
    { label }
        </label>
              <Form.Button
    color="purple" type="submit"
        > Upload
        </Form.Button>
            </Form>
    </Container>
  </Modal.Description>
      </Modal>
    )
  }
};

const styles = {
  fileStyle: {
    width: "0.1px",
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1"
  },
  labelStyle: {
    border: "2px solid black",
    borderRadius: "4px",
    cursor: 'pointer',
    fontSize: "1.25em",
    fontWeight: "700",
    padding: "1em",
    margin: "1em",
    display: "inline-block"
  },
  modalContentWrap: {
    padding: '1em'
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    uploadEventImage,
    uploadUserImage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);
