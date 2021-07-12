import React, { useState } from "react"

import AddCircle from "@material-ui/icons/AddCircle"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import ChronoTask from "./ChronoTask.jsx"
import ObjectID from "bson-objectid"
import useStyles from "./style.styles.js"

export default function ChronoScreen(props) {
  const classes = useStyles(props)
  document.title = "Mes taches"
  const [selected,setSelected] = useState(null)

  const [chronosCards, setChronosCards] = useState([
    {
      title: "Discussions",
      description: "Avec Jean-Charles",
      id: ObjectID().toHexString(),
    },
    {
      title: "Travail",
      description: "Au boulot",
      id: ObjectID().toHexString(),
    },
  ])
  console.log('id:',selected )

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
            editable={card.editable}
            onDelete={onDelete}
            setSelected={setSelected}
            selected={selected===card.id}
          />
        ))}
        <AddCircle
          className={classes.root}
          fontSize="large"
          color="secondary"
          onClick={() =>
            setChronosCards([
              ...chronosCards,
              {
                title: "",
                description: "",
                editable: true,
                id: ObjectID().toHexString(),
              },
            ])
          }
        />
      </CardContent>
    </Card>
  )
  function onDelete(id) {
    const newCard = chronosCards.filter((card) => card.id !== id)
    setChronosCards(newCard)
    localStorage.removeItem(`${id} count`)
    localStorage.removeItem(`${id} hour`)
  }
}
