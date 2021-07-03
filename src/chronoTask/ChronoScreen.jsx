import React, { useState } from "react"

import AddCircle from "@material-ui/icons/AddCircle"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import ChronoTask from "./ChronoTask.jsx"
import PropTypes from "prop-types"

export default function ChronoScreen() {
  const [chronosCards, setChronosCards] = useState([
    { title: "Discussions", description: "Avec Jp", id: 1 },
    { title: "Travail", description: "au boulot", id: 2 },
  ])

  return (
    <Card>
      <CardHeader title={"Mes Taches"} subheader={"De la journée"} />
      <CardContent
        style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
      >
        {chronosCards.map((card) => (
          <ChronoTask
            id={card.id}
            title={card.title}
            description={card.description}
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
                id: chronosCards.length + 1,
              },
            ])
          }
        />
      </CardContent>
    </Card>
  )
  function onDelete(id) {
    const newCard = chronosCards.filter((card) => card.id !== id)
    console.log("Appel OnDelete", newCard, id)
    setChronosCards(newCard)
  }
}

ChronoScreen.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
