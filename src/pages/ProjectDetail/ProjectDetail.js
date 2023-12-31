import React, { useState, useEffect } from "react";
import moment from "moment";
import HtmlParser from "react-html-parser";
import { DraftEditor } from "components/DraftEditor";
import { EditorState } from "draft-js";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  ListItemText,
  ListItem,
  List,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardActions,
  CardHeader,
  TextField,
  Divider,
  Box,
} from "@material-ui/core";
import {
  CloudDownloadOutlined as DownloadIcon,
  ExpandMore as ExpandMoreIcon,
  ComputerOutlined,
} from "@material-ui/icons";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import {
  addNewLog,
  getProjectDetails,
  getProjectHistories,
  getProjectProds,
} from "redux/actions/project";
import { useSelector } from "react-redux";
import Loading from "components/loading.component";
import { INVOICE_ROUTE } from "utils/constants";
import { projectTypes } from "pages/Project/projectConstants";
import { useStyles } from "styles/formStyles";
import { notifUser, toHtml } from "utils/helper";
// import { AddProductDialog } from "./AddProductDialog";
import { NoDisplayData } from "components/NoDisplayData";
import { ViewProductDialog } from "./ViewProductDialog";

const logInitialState = { title: "", description: "" };
// const productInitialState = { product: "", website: "", projectId: "" };
export const ProjectDetailPage = ({ match }) => {
  const classes = useStyles();

  const [projectType, setProjectType] = useState({});
  const [newLog, setNewLog] = useState(logInitialState);
  // const [newProduct, setNewProduct] = useState(productInitialState);
  const [currentProd, setCurrentProd] = useState({});
  // const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openViewProduct, setOpenViewProduct] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { projectId } = match.params;

  const appState = useSelector((state) => state);
  const {
    historiesGet: { loading, histories },
    projectGet: { loading: projectFetching, loaded, project },
    logAdd: { loading: adding, loaded: done },
    login: {
      userInfo: { user },
    },
    // projectAddProd: { loaded: productAdded },
    projectProdsGet: { loading: ppFetching, projProds },
  } = appState;
  useEffect(() => {
    if (projectId) {
      // Fetch the project
      getProjectDetails(projectId);
      getProjectProds(projectId);
    }
  }, [projectId]);
  useEffect(() => {
    if (projectId && loaded) {
      // setNewProduct((prev) => ({ ...prev, projectId }));
      getProjectHistories(projectId);
      const currentPType = projectTypes.find((e) => e.name === project.type);
      setProjectType(currentPType);
    }
  }, [projectId, loaded, project.type]);
  useEffect(() => {
    if (done) {
      getProjectHistories(projectId);
      setNewLog(logInitialState);
      setEditorState(EditorState.createEmpty());
    }
  }, [done, projectId]);
  // useEffect(() => {
  //   if (productAdded) {
  //     setNewProduct({ ...productInitialState, projectId });
  //     setOpenAddProduct(false);
  //     getProjectProds(projectId);
  //   }
  // }, [productAdded, projectId]);
  const { button: buttonStyles, ...contentStyles } =
    useBlogTextInfoContentStyles();
  const toDowloadUrl = (projectHistory = {}) => {
    let url = `${projectHistory.quote}?downloadType=proposal`;
    if (projectHistory.invoice) {
      url = `${projectHistory.invoice}?downloadType=invoice`;
    }
    return url;
  };
  const onChangeInput = ({ target: { name, value } }) => {
    setNewLog({ ...newLog, [name]: value });
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        py: 3,
      }}
    >
      {/* <AddProductDialog
        open={openAddProduct}
        setOpen={() => setOpenAddProduct(false)}
        values={newProduct}
        projectId={projectId}
        setValues={setNewProduct}
      /> */}
      <ViewProductDialog
        open={openViewProduct}
        setOpen={() => {
          setCurrentProd({});
          setOpenViewProduct(false);
        }}
        productId={currentProd._id}
      />
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Card component="main" className={classes.root}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ComputerOutlined />
            </Avatar>
            <Typography component="h1" variant="h4">
              {project.name}
            </Typography>
            <Typography variant="caption">
              {`Created by: ${project.user?.fullName}`}
            </Typography>
          </div>
          <CardHeader title="3D assets added" />
          <Divider />
          <CardContent>
            {ppFetching && !projProds.length ? (
              <Loading />
            ) : projProds.length ? (
              <List>
                {projProds.map((prod, prodIdx) => (
                  <ListItem divider key={prodIdx} component={Button}>
                    <ListItemText
                      primary={prod.product?.name}
                      secondary={`added ${moment(prod.createdAt).fromNow()}`}
                      onClick={() => {
                        setOpenViewProduct(true);
                        setCurrentProd(prod.product);
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <NoDisplayData message="No asset added yet" />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8} md={8} lg={8}>
        <Card
          aria-labelledby="project-name"
          aria-describedby="project-description"
        >
          <CardHeader
            title={`Project name: ${project.name?.toUpperCase()}`}
            // action={
            //   <Button
            //     variant="outlined"
            //     color="primary"
            //     onClick={() => setOpenAddProduct(true)}
            //   >
            //     Add a 3d asset
            //   </Button>
            // }
          />
          <CardContent>
            {projectFetching ? (
              <Loading />
            ) : (
              <>
                <TextInfoContent
                  classes={contentStyles}
                  overline={
                    project.user?.fullName &&
                    `Created by: ${project.user.fullName}`
                  }
                />
                <ListItemText
                  primary={`Start: ${moment(project.startDate).format(
                    "YYYY-MM-DD"
                  )}, Due date: ${moment(project.dueDate).format(
                    "YYYY-MM-DD"
                  )}`}
                />
                <Typography variant="h4">Project type:</Typography>
                <ListItem>
                  <ListItemText
                    primary={projectType?.name}
                    secondary={projectType?.description}
                  />
                </ListItem>
                <Typography variant="h4">
                  Number of items: {project.nOfItems}
                </Typography>
                {HtmlParser(project.description)}
                <Button className={buttonStyles}>
                  Budget: ${project.budget?.toLocaleString("en-US") || 0}
                </Button>
                {loading && !histories.length ? (
                  <Loading />
                ) : (
                  <CardContent>
                    <Card>
                      <CardHeader title="Add custom log" />
                      <CardContent>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                          <Grid container spacing={2}>
                            <TextField
                              label="Log title"
                              placeholder="Type here"
                              name="title"
                              fullWidth
                              value={newLog.title}
                              onChange={onChangeInput}
                            />
                            <DraftEditor
                              editorState={editorState}
                              setEditorState={setEditorState}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={adding}
                            onClick={() => {
                              newLog.description = toHtml(editorState);
                              addNewLog(projectId, newLog);
                            }}
                          >
                            Send
                          </Button>
                        </Grid>
                      </CardContent>
                    </Card>
                    <List>
                      {histories.map((history, historyIdx) => (
                        <Accordion key={historyIdx}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${historyIdx}a-content`}
                            id={`panel${historyIdx}a-header`}
                          >
                            <ListItem alignItems="flex-start">
                              <ListItemText
                                primary={history.description}
                                secondary={
                                  <>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      className={classes.inline}
                                      color="textPrimary"
                                    >
                                      {notifUser(user, history)}
                                    </Typography>
                                    {` — on ${moment(history.createdAt).format(
                                      "MMM DD, YYYY @ HH:mm"
                                    )}`}
                                  </>
                                }
                              />
                              {(history.invoice || history.quote) && (
                                <IconButton
                                  edge="end"
                                  size="small"
                                  component="a"
                                  aria-label="Print invoice"
                                  rel="noreferrer"
                                  href={`${INVOICE_ROUTE}/${toDowloadUrl(
                                    history
                                  )}`}
                                  target="_blank"
                                >
                                  <DownloadIcon />
                                </IconButton>
                              )}
                            </ListItem>
                          </AccordionSummary>
                          {Boolean(history.content) && (
                            <AccordionDetails>
                              <Box>{HtmlParser(history.content)}</Box>
                            </AccordionDetails>
                          )}
                        </Accordion>
                      ))}
                    </List>
                  </CardContent>
                )}
              </>
            )}
          </CardContent>
          <CardActions>
            <Button onClick={() => {}} color="primary">
              Close
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
