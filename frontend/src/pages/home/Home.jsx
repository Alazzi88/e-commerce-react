import "./Home.css";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "Redux/cartSlice";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {},
  }));



  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id
    })
    return myProduct.quantity
  }

  // @ts-ignore
  const { selectedProducts , selectedProductsID } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, error, isLoading } = useGetproductsByNameQuery();



  if (error) {
    return (
      <Box sx={{display:"flex"}}>
            <Typography variant="h1" color="error">
                  ERROR
                </Typography>
      </Box>
    );
  }


  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
//  data =>  all product

  if (data) {
    return (
      <Stack
        direction={"row"}
        sx={{
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data.map((item, index) => {
          return (
            <Card
              className="card"
              key={item.id}
              sx={{ maxWidth: 268, mb: 6, mx: 2 }}
            >
              <CardMedia
                component="img"
                height="277"
                image={item.imageLink[0]}
                alt="Paella dish"
                onClick={() => {
                  navigate(`product-details/${item.id}`)
                }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{ justifyContent: "space-between" }}
                disableSpacing
              >
                {selectedProductsID.includes (item.id ,) ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      color="primary"
                      sx={{
                        mr: "10px",
                      }}
                      onClick={() => {
                        dispatch(decreaseQuantity(item));
          
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>

                    <StyledBadge badgeContent={productQuantity(item)} color="primary" />

                    <IconButton
                      color="primary"
                      sx={{ ml: "10px" }}
                      onClick={() => {
                        dispatch(increaseQuantity(item));
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </div>
                ) : (
                  <Button
                    sx={{ textTransform: "capitalize", lineHeight: 1, p: 1 }}
                    variant="contained"
                    color="primary"
                    onClick={(params) => {
                      dispatch(addToCart(item));
                    }}
                  >
                  <ShoppingCart sx={{ fontSize:"18px", mr:1}}/>    Add to cart
                  </Button>
                )}

                <Typography
                  mr={1}
                  variant="body1"
                  color={theme.palette.error.light}
                >
                  $ {item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
