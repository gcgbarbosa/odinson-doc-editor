import React from "react";
//import { Link } from "gatsby";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'

import TAG from 'text-annotation-graphs'
import OdinParser from 'text-annotation-graphs/Parsers/odin'
//TAG.registerParser(new OdinParser(), "odin");

//const basicTag = TAG.tag({
//  container: "tag",
//  data: require('./sentence-1-odin.json'), // how do I put the data here
//  format: "odin"
//})

const IndexPage = () => (
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
    <Grid item xs={12}>
      <Paper>
        <Box p={4} minWidth="90vw">
          <Typography variant="h5" align="center" gutterBottom>
            Tag
          </Typography>
          <div id="tag">
          </div>
          
        </Box>
      </Paper>
    </Grid>
    <Grid item xs={12}>
      <Paper>
        <Box p={4} minWidth="90vw">
          <FormControl fullWidth>
            <TextField 
              width={1}
              multiline
              rows={8}
              defaultValue="json file"
              variant="outlined"
            />
          </FormControl>
        </Box>
      </Paper>
    </Grid>
    <Grid item xs={12}>
      <Paper>
        <Box p={4} minWidth="90vw">
          <Typography variant="h5" align="center" gutterBottom>
            Form with individual items
          </Typography>
        </Box>
      </Paper>
    </Grid>
  </Grid>
);

export default IndexPage;
