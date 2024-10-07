import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Box, Button, Card, Grid2, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [language, setLanguage] = useState("");

  const getRepos = async () => {
    let url = ``;

    if (language === "") {
      url = `https://api.github.com/search/repositories?q=stars:>=1000&sort=stars`;
    } else {
      url = `https://api.github.com/search/repositories?q=language:${language}+stars:>=1000&sort=stars`;
    }
    const headers = {
      // This token does expire. Keep that in mind
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    };

    try {
      const response = await fetch(url, headers);

      if (!response.ok) {
        console.error("Error response: received non 200");
      }

      const data = await response.json();
      // console.log("data: ", data.items);
      setFetchedData(data.items);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Take a look at searching for repositories
  const chooseLanguage = (language) => {
    setLanguage(language);
  };

  useEffect(() => {
    getRepos();
  }, [language]);

  return (
    <Box>
      <Grid2 container>
        <Grid size={3}></Grid>
        <Grid size={6}>
          <Button
            variant="contained"
            sx={{ mx: 2 }}
            onClick={() => chooseLanguage("")}
          >
            All
          </Button>
          <Button
            variant="contained"
            sx={{ mx: 2 }}
            onClick={() => chooseLanguage("Javascript")}
          >
            Javascript
          </Button>
          <Button
            variant="contained"
            sx={{ mx: 2 }}
            onClick={() => chooseLanguage("Ruby")}
          >
            Ruby
          </Button>
          <Button
            variant="contained"
            sx={{ mx: 2 }}
            onClick={() => chooseLanguage("Java")}
          >
            Java
          </Button>
          <Button
            variant="contained"
            sx={{ mx: 2 }}
            onClick={() => chooseLanguage("CSS")}
          >
            CSS
          </Button>
          <Button
            variant="contained"
            sx={{ mx: 2 }}
            onClick={() => chooseLanguage("Python")}
          >
            Python
          </Button>
        </Grid>
        <Grid size={3}></Grid>
      </Grid2>
      <Grid2 container>
        {fetchedData.length > 1 ? (
          fetchedData.map((repo, i) => {
            return (
              <Grid size={2} sx={{ m: 2 }}>
                <Typography>#{i + 1}</Typography>
                <img src={repo.owner.avatar_url} />
                <Typography sx={{ color: "red" }}>{repo.name}</Typography>
                <Typography>@{repo.owner.login}</Typography>
                <Typography>{repo.stargazers_count} stars</Typography>
              </Grid>
            );
          })
        ) : (
          <Typography variant="h2">Please reload to retry fetching data</Typography>
        )}
      </Grid2>
    </Box>
  );
}

export default App;
