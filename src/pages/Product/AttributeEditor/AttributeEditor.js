import React from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { useStyles } from "../productStyles";
import { Scene } from "./Scene";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
const a11yProps = (index) => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
};
export const AttributeEditor = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Scene" {...a11yProps(0)} />
        <Tab label="Lighting" {...a11yProps(1)} />
        <Tab label="Material" {...a11yProps(2)} />
        <Tab label="Annotations" {...a11yProps(3)} />
        <Tab label="AR" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Scene />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Material
      </TabPanel>
      <TabPanel value={value} index={3}>
        Annotations
      </TabPanel>
      <TabPanel value={value} index={4}>
        AR
      </TabPanel>
    </div>
  );
};
