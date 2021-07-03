import Button from "@material-ui/core/Button"
import Cancel from "@material-ui/icons/Cancel"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"
import moment from "moment"
import useInterval from "./useInterval"
import { useState } from "react"

export default function ChronoTask({
  id,
  titleDefault,
  descriptionDefault,
  onDelete,
}) {
  const [count, setCount] = useState(0)
  const [increment, setIncrement] = useState(0)
  const [title, setTitle] = useState(titleDefault || "")
  const [description, setDescription] = useState(descriptionDefault || "")

  function handleChange(event) {
    if (event.target.id === "id-title") setTitle(event.target.value)
    else if (event.target.id === "id-description")
      setDescription(event.target.value)
  }

  useInterval(() => {
    setCount(count + increment)
    localStorage.setItem(`${id} count`, JSON.stringify(count))
    localStorage.setItem(`${id} hour`, new Date().getTime())
    // localStorage.setItem(
    //   "chronotask",
    //   JSON.stringify({
    //     ...localStorage.getItem("chronotask"),
    //     [title]: JSON.stringify(count),
    //   })
    // )
    // localStorage.setItem(
    //   "chronotask",
    //   JSON.stringify({
    //     ...localStorage.getItem("chronotask"),
    //     [id]: new Date().getTime(),
    //   })
    // )
  }, 1000)

  return (
    <Card style={{ width: "20em", margin: "2em" }}>
      {/* <CardHeader title={title} subheader={description} /> */}
      {/* <CardHeader>
        <form noValidate autoComplete='off'>
          <TextField id="id-basic" label={title} />
        </form>
      </CardHeader> */}
      <CardHeader
        title={
          <TextField
            id="id-title"
            label="Titre"
            onChange={handleChange}
            value={titleDefault || title}
          />
        }
        subheader={
          <TextField
            id="id-description"
            label="Description"
            onChange={handleChange}
            value={description}
            multiline
            rowsMax={4}
          />
        }
        avatar={
          <Cancel
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
          color="primary"
          type="submit"
          variant="contained"
          onClick={() => (increment === 1 ? setIncrement(0) : setIncrement(1))}
        >
          {increment === 1 ? "STOP" : "START"}
        </Button>
        <Button
          color="secondary"
          type="submit"
          variant="contained"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </CardActions>
    </Card>
  )
}

ChronoTask.propTypes = {
  descriptionDefault: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  titleDefault: PropTypes.string.isRequired,
}
