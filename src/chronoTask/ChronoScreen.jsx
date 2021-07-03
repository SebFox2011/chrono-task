import React, { useState } from "react"

import AddCircle from "@material-ui/icons/AddCircle"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import ChronoTask from "./ChronoTask.jsx"
import ObjectID from "bson-objectid"

export default function ChronoScreen() {
  const [chronosCards, setChronosCards] = useState([
    {
      title: "Discussions",
      description: "Avec Jp",
      id: ObjectID().toHexString(),
    },
    {
      title: "Travail",
      description: "au boulot",
      id: ObjectID().toHexString(),
    },
  ])

  return (
    <Card>
      <CardHeader title={"Mes Taches"} subheader={"De la journée"} />
      <CardContent
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
      >
        {chronosCards.map((card) => (
          <ChronoTask
            key={card.id}
            id={card.id}
            titleDefault={card.title}
            descriptionDefault={card.description}
            editable={card.editable}
            onDelete={onDelete}
          />
        ))}
        <AddCircle
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
