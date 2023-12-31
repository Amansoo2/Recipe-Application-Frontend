import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Chip,
    IconButton,
    Card,
    Tooltip,
    Fab,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import ResponsiveAppBar from "../comp/Appbar";
  import { DeleteOutline, PhotoCamera } from "@mui/icons-material";
  import axios from "axios";
  export default function EditRecipe(props) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [recipe, setRecipe] = useState({
      name: "",
      description: "",
      ingredients: [],
      steps: [],
      images: [],
    });
    const [images, setImages] = useState([]);
    const [rmv, setRmv] = useState([]);
    const [imgFiles, setImgFiles] = useState([]);
    useEffect(() => {
      axios({
        method: "post",
        url: process.env.REACT_APP_API + "recipe/",
        data: {
          id,
        },
      })
        .then((res) => {
          setRecipe({ ...res.data.recipe, images: [] });
          setRmv(res.data.recipe.images);
          console.log(res.data.recipe);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);
    async function uploadImages() {
      if (
        recipe.name === "" ||
        recipe.description === "" ||
        recipe.ingredients.length === 0 ||
        recipe.steps.length === 0 ||
        imgFiles.length === 0
      ) {
        alert("Please fill all fields");
        return;
      } else {
        try {
          await Promise.all(
            imgFiles.map(async (file) => {
              let formData = new FormData();
              formData.append("image", file);
              const result = await axios({
                method: "post",
                url: process.env.REACT_APP_API + "addImage/",
                data: formData,
              });
  
              recipe.images.push({
                cloudinary_id: result.data.cloudinary_id,
                url: result.data.url,
              });
            })
          );
          uploadRecipe();
        } catch (err) {
          console.log(err);
        }
      }
    }
    async function uploadRecipe() {
      try {
        await Promise.all(
          rmv.map(async (item) => {
            axios({
              method: "post",
              url: process.env.REACT_APP_API + "removeImage/",
              data: {
                cloudinary_id: item.cloudinary_id,
              },
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          })
        );
      } catch (err) {
        console.log(err);
      }
  
      console.log(recipe);
      await axios({
        method: "post",
        url: process.env.REACT_APP_API + "editRecipe/",
        data: recipe,
      })
        .then((res) => {
          if (res.status === 200) {
            alert(res.data.message);
            navigate("/");
          }
        })
        .catch((res) => {
          console.log(res);
          alert("Internal server error");
        });
    }
    return (
      <Box
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#cc5577",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 60'%3E%3Cg %3E%3Crect fill='%23cc5577' width='11' height='11'/%3E%3Crect fill='%23ce5776' x='10' width='11' height='11'/%3E%3Crect fill='%23d05a76' y='10' width='11' height='11'/%3E%3Crect fill='%23d15c75' x='20' width='11' height='11'/%3E%3Crect fill='%23d35f74' x='10' y='10' width='11' height='11'/%3E%3Crect fill='%23d46174' y='20' width='11' height='11'/%3E%3Crect fill='%23d66473' x='30' width='11' height='11'/%3E%3Crect fill='%23d76673' x='20' y='10' width='11' height='11'/%3E%3Crect fill='%23d96972' x='10' y='20' width='11' height='11'/%3E%3Crect fill='%23da6c72' y='30' width='11' height='11'/%3E%3Crect fill='%23db6e71' x='40' width='11' height='11'/%3E%3Crect fill='%23dc7171' x='30' y='10' width='11' height='11'/%3E%3Crect fill='%23dd7471' x='20' y='20' width='11' height='11'/%3E%3Crect fill='%23de7671' x='10' y='30' width='11' height='11'/%3E%3Crect fill='%23df7971' y='40' width='11' height='11'/%3E%3Crect fill='%23e07c71' x='50' width='11' height='11'/%3E%3Crect fill='%23e17e71' x='40' y='10' width='11' height='11'/%3E%3Crect fill='%23e28171' x='30' y='20' width='11' height='11'/%3E%3Crect fill='%23e38471' x='20' y='30' width='11' height='11'/%3E%3Crect fill='%23e38771' x='10' y='40' width='11' height='11'/%3E%3Crect fill='%23e48972' y='50' width='11' height='11'/%3E%3Crect fill='%23e58c72' x='60' width='11' height='11'/%3E%3Crect fill='%23e58f73' x='50' y='10' width='11' height='11'/%3E%3Crect fill='%23e69173' x='40' y='20' width='11' height='11'/%3E%3Crect fill='%23e69474' x='30' y='30' width='11' height='11'/%3E%3Crect fill='%23e79775' x='20' y='40' width='11' height='11'/%3E%3Crect fill='%23e79a75' x='10' y='50' width='11' height='11'/%3E%3Crect fill='%23e89c76' x='70' width='11' height='11'/%3E%3Crect fill='%23e89f77' x='60' y='10' width='11' height='11'/%3E%3Crect fill='%23e8a278' x='50' y='20' width='11' height='11'/%3E%3Crect fill='%23e9a47a' x='40' y='30' width='11' height='11'/%3E%3Crect fill='%23e9a77b' x='30' y='40' width='11' height='11'/%3E%3Crect fill='%23e9aa7c' x='20' y='50' width='11' height='11'/%3E%3Crect fill='%23e9ac7e' x='80' width='11' height='11'/%3E%3Crect fill='%23eaaf7f' x='70' y='10' width='11' height='11'/%3E%3Crect fill='%23eab281' x='60' y='20' width='11' height='11'/%3E%3Crect fill='%23eab482' x='50' y='30' width='11' height='11'/%3E%3Crect fill='%23eab784' x='40' y='40' width='11' height='11'/%3E%3Crect fill='%23eaba86' x='30' y='50' width='11' height='11'/%3E%3Crect fill='%23ebbc88' x='90' width='11' height='11'/%3E%3Crect fill='%23ebbf8a' x='80' y='10' width='11' height='11'/%3E%3Crect fill='%23ebc18c' x='70' y='20' width='11' height='11'/%3E%3Crect fill='%23ebc48e' x='60' y='30' width='11' height='11'/%3E%3Crect fill='%23ebc790' x='50' y='40' width='11' height='11'/%3E%3Crect fill='%23ebc992' x='40' y='50' width='11' height='11'/%3E%3Crect fill='%23ebcc94' x='90' y='10' width='11' height='11'/%3E%3Crect fill='%23ebce97' x='80' y='20' width='11' height='11'/%3E%3Crect fill='%23ebd199' x='70' y='30' width='11' height='11'/%3E%3Crect fill='%23ecd39c' x='60' y='40' width='11' height='11'/%3E%3Crect fill='%23ecd69e' x='50' y='50' width='11' height='11'/%3E%3Crect fill='%23ecd8a1' x='90' y='20' width='11' height='11'/%3E%3Crect fill='%23ecdba4' x='80' y='30' width='11' height='11'/%3E%3Crect fill='%23ecdda6' x='70' y='40' width='11' height='11'/%3E%3Crect fill='%23ece0a9' x='60' y='50' width='11' height='11'/%3E%3Crect fill='%23ede2ac' x='90' y='30' width='11' height='11'/%3E%3Crect fill='%23ede4af' x='80' y='40' width='11' height='11'/%3E%3Crect fill='%23ede7b2' x='70' y='50' width='11' height='11'/%3E%3Crect fill='%23ede9b5' x='90' y='40' width='11' height='11'/%3E%3Crect fill='%23eeecb8' x='80' y='50' width='11' height='11'/%3E%3Crect fill='%23EEB' x='90' y='50' width='11' height='11'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ResponsiveAppBar />
        <Paper
          sx={{
            m: 1,
            p: 1,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            overflowY: "auto",
          }}
        >
          <TextField
            sx={{ mb: 1 }}
            fullWidth
            size={"small"}
            value={recipe?.name}
            placeholder="Name"
            onChange={(event) => {
              setRecipe({ ...recipe, name: event.target.value });
            }}
          />
          <br />
          <TextField
            size={"small"}
            sx={{ mb: 1 }}
            fullWidth
            placeholder="Description"
            value={recipe?.description}
            onChange={(event) => {
              setRecipe({ ...recipe, description: event.target.value });
            }}
          />
          <Box sx={{ m: 1, flexWrap: "wrap" }}>
            {recipe?.ingredients?.map((ingredient, index) => (
              <Chip
                key={index}
                label={ingredient}
                sx={{ m: 0.4 }}
                onDelete={() => {
                  setRecipe({
                    ...recipe,
                    ingredients: recipe.ingredients.filter((_, i) => i !== index),
                  });
                }}
              />
            ))}
          </Box>
          <TextField
            variant="outlined"
            placeholder="Add ingredients"
            sx={{
              width: "fit-content",
              margin: "0 auto",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setRecipe({
                  ...recipe,
                  ingredients: [...recipe.ingredients, e.target.value],
                });
                e.target.value = "";
              }
            }}
          />
          <Box sx={{ m: 1, flexWrap: "wrap", border: "1px solid, yellow" }}>
            {recipe?.steps?.length > 0 ? "METHOD :" : ""}
            {recipe.steps.map((step, index) => (
              <Typography key={index} sx={{ m: 0.4 }}>
                {index + 1}.{step}
                <IconButton
                  onClick={() => {
                    setRecipe({
                      ...recipe,
                      steps: recipe.steps.filter((_, i) => i !== index),
                    });
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </Typography>
            ))}
          </Box>
          <TextField
            variant="outlined"
            placeholder="Add Steps"
            sx={{
              width: "fit-content",
              margin: "0 auto",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setRecipe({
                  ...recipe,
                  steps: [...recipe.steps, e.target.value],
                });
                e.target.value = "";
              }
            }}
          />
          <Box sx={{ m: 1, flexWrap: "wrap", display: "flex", margin: "0 auto" }}>
            {images?.map((image, index) => (
              <Card
                key={index}
                sx={{
                  m: 0.4,
                  p: 0.4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <img
                  width="200px"
                  height="200px"
                  src={image}
                  key={index}
                  alt="recipe"
                  sx={{
                    objectFit: "cover",
                  }}
                />
                <Button
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== index));
                    setImgFiles(imgFiles.filter((_, i) => i !== index));
                  }}
                >
                  <DeleteOutline />
                </Button>
              </Card>
            ))}{" "}
          </Box>
          <Tooltip title="Upload Images">
            <Fab
              color={images?.length > 2 ? "disabled" : "success"}
              aria-label="upload picture"

