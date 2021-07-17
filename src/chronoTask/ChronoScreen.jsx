import React, { useEffect, useState } from "react"

import AddCircle from "@material-ui/icons/AddCircle"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import ChronoTask from "./ChronoTask.jsx"
import ObjectID from "bson-objectid"
import useStyles from "./style.styles.js"

export default function ChronoScreen(props) {
  const classes = useStyles(props)
  document.title = "Chrono Tasks"
  const [selected, setSelected] = useState(null)

  const [chronosCards, setChronosCards] = useState([
    {
      title: "Réunions",
      description: "Daily meeting",
      id: ObjectID().toHexString(),
    },
    {
      title: "Travail",
      description: "Temps d'écution des tests",
      id: ObjectID().toHexString(),
    },
  ])

  const onDelete = (id) => {
    const newCard = chronosCards.filter((card) => card.id !== id)
    setChronosCards(newCard)
  }

  const addChronoCard = () =>
    setChronosCards([
      ...chronosCards,
      {
        title: "",
        description: "",
        id: ObjectID().toHexString(),
      },
    ])

  useEffect(() => {
    localStorage.setItem("chrono-tasks", JSON.stringify(chronosCards))
  }, [chronosCards])

  return (
    <Card>
      <CardHeader title={"Mes Taches"} subheader={"De la journée"} />
      <CardContent
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
      >
        {chronosCards.map((card, index) => (
          <ChronoTask
            key={card.id}
            id={card.id}
            titleDefault={card.title}
            descriptionDefault={card.description}
            onDelete={onDelete}
            setSelected={setSelected}
            selected={selected === card.id}
          />
        ))}
        <AddCircle
          className={classes.root}
          fontSize="large"
          color="secondary"
          onClick={addChronoCard}
        />
      </CardContent>
    </Card>
  )
  
}
