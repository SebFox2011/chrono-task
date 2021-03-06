import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: (props) => props.color,
      "&:hover": {
        cursor: "pointer",
      },
    }, 
    expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
  }
 )
)

export default useStyles
