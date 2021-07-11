import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: (props) => props.color,
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
)

export default useStyles
