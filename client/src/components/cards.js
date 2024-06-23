import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "5px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Cards({name,city,state,pin,type,phone,website,id}) {
    const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {city}
          {bull}
          {state}
          {bull}
          {pin}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Type:{type}
        </Typography>
        <Typography variant="body2">
          Phone No. {phone}
          <br />
          Website : <a href={website}>{website ? website :"Not available"}</a>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            navigate(`/review/${id}`);
          }}
        >
          Give Review
        </Button>
      </CardActions>
    </Card>
  );
}
