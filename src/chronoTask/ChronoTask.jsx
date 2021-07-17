import "moment/locale/fr"

import React, { useEffect } from "react"

import Button from "@material-ui/core/Button"
import Cancel from "@material-ui/icons/Cancel"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Collapse from "@material-ui/core/Collapse"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import IconButton from "@material-ui/core/IconButton"
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import clsx from "clsx"
import moment from "moment"
import useInterval from "./useInterval"
import { useState } from "react"
import useStyles from "./style.styles"

export default function ChronoTask({
  id,
  titleDefault,
  descriptionDefault,
  onDelete,
  setSelected,
  selected,
}) {
  const classes = useStyles()
  const [count, setCount] = useState(0)
  const [increment, setIncrement] = useState(0)
  const [title, setTitle] = useState(titleDefault ?? "")
  const [description, setDescription] = useState(descriptionDefault ?? "")
  const [expanded, setExpanded] = useState(false)
  const [histories, setHistories] = useState([])

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleChange = (event) => {
    if (event.target.id === "id-title") setTitle(event.target.value)
    else if (event.target.id === "id-description")
      setDescription(event.target.value)
  }

  const handleClick = (event) => {
    setSelected(id)
    if (increment) {
      setIncrement(0)
      setHistories([...histories, `Fin: ${moment(new Date()).format("LLL")}`])
    } else {
      setIncrement(1)
      setHistories([...histories, `Début: ${moment(new Date()).format("LLL")}`])
    }
  }

  useEffect(() => {
    if (selected) {
      document.title = `${title.slice(0, 20)}:  ${moment(count * 1000)
        .utcOffset(0)
        .format("HH:mm:ss")}`
      setIncrement(1)
    } else setIncrement(0)
  }, [id, count, title, selected])

  useInterval(() => {
    setCount(count + increment)
  }, 1000)

  console.log("render")

  return (
    <Card
      id={`id-card-${id}`}
      elevation={selected ? 7 : 0}
      variant={selected ? null : "outlined"}
      style={{ width: "20em", margin: "2em" }}
    >
      <CardHeader
        id={`id-card-header-${id}`}
        title={
          <TextField
            id={`id-title-${id}`}
            label="Titre"
            onChange={handleChange}
            value={titleDefault || title}
          />
        }
        subheader={
          <TextField
            id={`id-description-${id}`}
            label="Description"
            onChange={handleChange}
            value={description}
            multiline
            rowsMax={4}
          />
        }
        avatar={
          <Cancel
            id={`id-cancel-${id}`}
            className={classes.root}
            color="secondary"
            onClick={() => {
              onDelete(id)
            }}
          />
        }
      />
      <CardContent style={{ display: "flex", justifyContent: "center" }}>
        <h1>
          {moment(count * 1000)
            .utcOffset(0)
            .format("HH:mm:ss")}
        </h1>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          id={`id-start-stop-${id}`}
          color="primary"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          {increment === 1 ? "STOP" : "START"}
        </Button>
        <Button
          id={`id-reset-${id}`}
          color="secondary"
          type="submit"
          variant="contained"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
        <IconButton
          id={`id-expand-${id}`}
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Historique:</Typography>
          <div style={{ height: "100px", overflowY: "auto" }}>
            {histories.map((history) => (
              <Typography paragraph>{history}</Typography>
            ))}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

ChronoTask.propTypes = {
  descriptionDefault: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  titleDefault: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
}
