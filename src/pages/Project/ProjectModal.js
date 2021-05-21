import React, { forwardRef, useState, useEffect } from "react";
import moment from "moment";
import HtmlParser from "react-html-parser";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  CardContent,
} from "@material-ui/core";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ProjectModel = ({ open = false, setOpen, currentItem = null }) => {
  const [project, setProject] = useState({ name: "" });
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (currentItem) {
      setProject(currentItem);
      setEvents([
        {
          title: currentItem.name,
          start: currentItem.startDate,
          end: currentItem.dueDate,
          allDay: true,
        },
      ]);
    }
  }, [currentItem]);
  const { button: buttonStyles, ...contentStyles } =
    useBlogTextInfoContentStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={setOpen}
      aria-labelledby="project-name"
      aria-describedby="project-description"
    >
      <DialogTitle id="project-name">
        {`Project name: ${project.name.toUpperCase()}`}
      </DialogTitle>
      <DialogContent>
        <CardContent>
          <TextInfoContent
            classes={contentStyles}
            overline={
              project.user?.firstName &&
              `Created by: ${project.user.firstName} ${project.user.lastName}`
            }
            heading={`Project duration: ${moment(project.startDate).format(
              "YYYY-MM-DD"
            )} to ${moment(project.dueDate).format("YYYY-MM-DD")}`}
          />
          {HtmlParser(project.description)}
          <Button className={buttonStyles}>
            Budget: ${project.budget || 0}
          </Button>
          <Calendar
            localizer={momentLocalizer(moment)}
            events={events}
            defaultView="week"
          />
        </CardContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={setOpen} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
