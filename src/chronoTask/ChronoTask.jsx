import { useEffect, useState } from "react"

import Button from "@material-ui/core/Button"
import Cancel from "@material-ui/icons/Cancel"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"
import moment from "moment"
import useStyles from "./style.styles.js"

export default function ChronoTask({
  id,
  titleDefault,
  descriptionDefault,
  onDelete,
}) {
  const classes = useStyles()
  const [title, setTitle] = useState(titleDefault || "")
  const [description, setDescription] = useState(descriptionDefault || "")

  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(true)
  const [time, setTime] = useState(0)

  function handleChange(event) {
    if (event.target.id === "id-title") setTitle(event.target.value)
    else if (event.target.id === "id-description")
      setDescription(event.target.value)
  }

  const handleClick = () => {
    localStorage.setItem(`${id} start`, new Date().getTime())
    setIsActive(!isActive)
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsActive(false)
    setTime(0)
  }

  // useInterval(() => {
  //   setCount(count + increment)
  //   localStorage.setItem(`${id} count`, JSON.stringify(count))
  //   localStorage.setItem(`${id} hour`, new Date().getTime())
  //   // localStorage.setItem(
  //   //   "chronotask",
  //   //   JSON.stringify({
  //   //     ...localStorage.getItem("chronotask"),
  //   //     [title]: JSON.stringify(count),
  //   //   })
  //   // )
  //   // localStorage.setItem(
  //   //   "chronotask",
  //   //   JSON.stringify({
  //   //     ...localStorage.getItem("chronotask"),
  //   //     [id]: new Date().getTime(),
  //   //   })
  //   // )
  // }, 1000)
  useEffect(() => {
    let interval = null

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }
    return () => {
      clearInterval(interval)
    }
  }, [isActive, isPaused])

  return (
    <Card variant="outlined" style={{ margin: "1vh" }}>
      <CardHeader
        title={
          <TextField
            id={`id-title ${id}`}
            label="Titre"
            onChange={handleChange}
            value={titleDefault || title}
          />
        }
        subheader={
          <TextField
            id={`id-description ${id}`}
            label="Description"
            onChange={handleChange}
            value={description}
            multiline
            rowsMax={4}
          />
        }
        action={
          <Cancel
            className={classes.root}
            color="secondary"
            onClick={() => {
              onDelete(id)
            }}
          />
        }
      />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1>{moment(time).utcOffset(0).format("HH:mm:ss")}</h1>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          onClick={handleClick}
        >
          {isActive ? "STOP" : "START"}
        </Button>
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          onClick={handleReset}
        >
          Reset
        </Button>
      </CardActions>
    </Card>
  )
}

ChronoTask.propTypes = {
  id: PropTypes.string.isRequired,
  descriptionDefault: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  titleDefault: PropTypes.string.isRequired,
}
