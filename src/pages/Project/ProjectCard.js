import React from "react";
import cx from "clsx";
import { Card, CardMedia, CardContent, Button } from "@material-ui/core";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import { useStyles } from "./styles";

export const ProjectCard = React.memo(function BlogCard() {
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={styles.media}
        image={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Git_icon.svg/2000px-Git_icon.svg.png"
        }
      />
      <CardContent>
        <TextInfoContent
          classes={contentStyles}
          overline={"28 MAR 2019"}
          heading={"What is Git ?"}
          body={
            "Git is a distributed version control system. Every dev has a working copy of the code and..."
          }
        />
        <Button className={buttonStyles}>Read more</Button>
      </CardContent>
    </Card>
  );
});
