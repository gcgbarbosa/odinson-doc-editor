import React from 'react';

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

import {TAGComponent} from '@lum-ai/react-tag'

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
              value={this.state.jsonDocument}
            />
          </FormControl>
          <Button onClick={this.handleSubmit} variant="contained">Save</Button>
        </form>
      </Box>
    )
  }
}

class TAGViz extends React.Component {
  render() {
    return (
      <Box p={4} minWidth="90vw">
        <Typography variant="h5" align="center" gutterBottom>
          Tag
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Box width={0.9}>
            <TAGComponent
              data={this.props.jsonDocument}
              topTagCategory="chunk"
              bottomTagCategory="POS"
              bottomLinkCategory="universal-enhanced"
              showTopMainLabel={true}
              showTopArgLabels={true}
            />
          </Box>
        </Box>
      </Box>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {jsonFile: ''}
  }

  handleTextAreaJsonInput = (json) => {
    let json_obj = JSON.parse(json)
    this.setState({jsonFile: json_obj})
  }

  render() {
    let tag;
    // only render tag if this is set
    if (this.state.jsonFile) {
      tag = (
        <Grid item xs={12}>
          <Paper>
            <TAGViz jsonDocument={this.state.jsonFile} />
          </Paper>
        </Grid>
      )
    }
    return (
      <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
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
            <TextAreaJson onJsonDocumentChange={this.handleTextAreaJsonInput} />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default App;
