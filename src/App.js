import React, {useState, useRef} from 'react';
import ReactDOM from "react-dom";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'

import {TAGComponent} from '@lum-ai/react-tag'
import CustomParser from './odinson'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {jsonFile: '', jsonMode: true, documentFile: '', backup: '', exportSVG: true}
  }

  handleTextAreaJsonInput = (json) => {
    if (this.state.jsonMode) {
      this.documentFile = json
      let state = this.state
      state.jsonFile = JSON.parse(json)
      this.setState(state)
    }
  }

  handleDownloadClick = () => {
    if (this.state.jsonFile && this.state.jsonMode) {
      const node = ReactDOM.findDOMNode(this)
      let state = this.state
      state.jsonMode = false
      state.backup = state.documentFile
      state.documentFile = node.querySelector('.tagContainer').innerHTML
      this.setState(state)
    } else if (this.state.jsonMode === false) {
      let state = this.state
      state.jsonMode = true
      state.documentFile = state.backup
      this.setState(state)
    }

  }

  handleCloseDownload = () => {
    var state = this.state
    state.jsonMode = true
    this.setState(state)
  }

  render() {
    let tag;
    // only render tag if this is set
    if (this.state.jsonFile) {
      tag = (
        <Grid item xs={12}>
          <Paper>
            <TAGVizualization jsonDocument={this.state.jsonFile} exportSVG={this.state.exportSVG} />
          </Paper>
        </Grid>
      )
    }
    // 
    let buttonLabel = 'svgme'
    if (this.state.jsonMode === false) {
      buttonLabel = 'backtonormal'
    }
    let svgButton;
    if (this.state.jsonFile) {
      svgButton = (
        <Box p={4} pt={0}>
          <Button onClick={this.handleDownloadClick} color='primary'>
            {buttonLabel}
          </Button>
        </Box>
      )
    }

    return (
      <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
        <Dialog
          onClose={this.handleCloseDownload}
          open={this.open}
        >
          <DialogTitle>
            Something goes here
          </DialogTitle>
          <DialogContent>
            This is the content of the thing.
            RN it does not really have anything.
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDownload} color='primary'>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={12}>
          <Paper>
            <Box p={4} minWidth="90vw">
              <Typography variant="h4" align="center" gutterBottom>
                Odinson File Editor
              </Typography>
            </Box>
          </Paper>
        </Grid>
        {tag}
        <Grid item xs={12}>
          <Paper>
            <TextAreaJson
              onJsonDocumentChange={this.handleTextAreaJsonInput}
              documentFile={this.state.documentFile}
            />
            {svgButton}
          </Paper>
        </Grid>

      </Grid>
    )
  }
}

class TAGVizualization extends React.Component {
  render() {
    return (
      <Box p={4} minWidth="90vw">
        <Typography variant="h5" align="center" gutterBottom>
          Tag
        </Typography>
        <Box width={1}>
          <TAGComponent
            exportSVG={this.props.exportSVG}
            data={this.props.jsonDocument}
            topTagCategory="chunk"
            bottomTagCategory="POS"
            bottomLinkCategory="universal-enhanced"
            showTopMainLabel={true}
            showTopArgLabels={true}
            customParsers={[{ParserClass: CustomParser, name: 'custom'}]}
            format="custom"
          />
          <Box>
          </Box>
        </Box>
      </Box>
    )
  }
}

class TextAreaJson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {jsonDocument: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({jsonDocument: event.target.value})
  }

  handleSubmit(event) {
    this.props.onJsonDocumentChange(this.state.jsonDocument)
    event.preventDefault();
  }

  render() {
    let print = this.state.jsonDocument
    if (this.props.documentFile) {
      print = this.props.documentFile
    }
    return (
      <Box p={4} minWidth="90vw">
        <form>
          <FormControl fullWidth>
            <TextField
              multiline
              rows={8}
              width={1}
              variant="outlined"
              onChange={this.handleChange}
              value={print}
            />
          </FormControl>
          <Button onClick={this.handleSubmit} variant="contained">Plot</Button>
        </form>
      </Box>
    )
  }
}


export default App;
