import "./App.css";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
// eslint-disable-next-line
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { listProjects } from "./graphql/queries";
import { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  Button,
  Grid,
  CardMedia
  
} from "@material-ui/core";
import randomColor from 'randomcolor';

Amplify.configure(awsconfig);

function App() {
  // eslint-disable-next-line
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectData = await API.graphql(graphqlOperation(listProjects));
      const projectList = projectData.data.listProjects.items;
      console.log("PROJECTS ", projectList);
      setProjects(projectList);
    } catch (error) {
      console.log("error on fetching projects from api", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>My App Content</h2>
      </header>
      <div className="projectList">
        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {projects.map((project) => (
            <Grid item  key={projects.indexOf(project)}>
              <Card className="projectCard" style={{background:randomColor()}}>
                <CardMedia
                component="img"
    image={project.imgURL}
    style={{ height: 'auto' }}
  />
                <CardActions className="cardActions">
                  <Button size="small" color="primary" >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
