import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {
  setResults,
  setImageURL,
  setModel,
  setAppState,
  selectResults,
} from './state/reducers/appReducer';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Slider,
  Typography,
} from '@mui/material';
import '@tensorflow/tfjs-backend-webgl';
import { Image } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { classesMap } from './data/classesMap';

const dogAPI = 'https://api.api-ninjas.com/v1/dogs?name=';
const catAPI = 'https://api.api-ninjas.com/v1/cats?name=';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [, setInputFile] = useState<File | undefined>(undefined);
  const [loadingNote, setLoadingNote] = useState<string | null>(null);
  const { results, imageURL, model, appState } = useSelector(selectResults);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [breed, setBreed] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [noInfoFound, setNoInfoFound] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setInputFile(acceptedFiles[0]);
      const url = URL.createObjectURL(acceptedFiles[0]);
      dispatch(setImageURL(url));
      dispatch(setAppState('imageReady'));
    },
  });

  const dispatch = useDispatch();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const loadModel = async () => {
    dispatch(setAppState('loadingModel'));
    setLoadingNote('Loading MobileNet model...');
    const loadedModel = await mobilenet.load();
    setLoadingNote('Saving model...');
    dispatch(setModel(loadedModel));
    //wait 500ms to show the loading screen

    setLoadingNote('Finishing up...');
    await setTimeout(() => {
      dispatch(setImageURL(undefined));
      dispatch(setResults([]));
      setBreed(null);
      setLoading(false);
      dispatch(setAppState('modelReady'));
    }, 500);
  };

  const identify = async () => {
    setLoading(true);
    setLoadingNote(null);
    dispatch(setAppState('identifying'));
    const classificationResults = await model?.classify(
      imageRef.current as HTMLImageElement,
    );

    dispatch(setResults(classificationResults || []));
    dispatch(setAppState('complete'));

    const breed = classificationResults?.[0].className;

    const _breed = checkForAnimal(breed);

    if (_breed) {
      setBreed(breed);
      setNoInfoFound(false);
      switch (_breed) {
        case 'dog':
          setLoadingNote('Fetching dog...');
          fetchDogsIfPossible(breed);
          break;
        case 'cat':
          setLoadingNote('Fetching cat...');
          fetchCatsIfPossible(breed);
          break;
        default:
          fallback();
          break;
      }
    } else {
      fallback();
    }
  };

  const checkForAnimal = (breed: string) => {
    console.info('Checking for animal', breed);
    const breedLower = breed.toLowerCase();
    const classes = Object.keys(classesMap);
    for (let i = 0; i < classes.length; i++) {
      const classKey = classes[i];
      const classValues = classesMap[classKey as keyof typeof classesMap];
      for (let j = 0; j < classValues.length; j++) {
        const classValue = classValues[j];
        if (breedLower.includes(classValue)) {
          return classKey;
        }
      }
    }

    return null;
  };

  const formatBreed = (breed: string) => {
    const split = breed.split(',');
    if (split.length > 1) {
      return split[1].trim();
    }

    if (breed.toLowerCase().includes('cat')) {
      return breed.replace('cat', '').trim();
    }

    return breed;
  };

  const fetchDogsIfPossible = async (name: string) => {
    fetch(dogAPI + formatBreed(name), {
      headers: {
        'X-Api-Key': API_KEY,
      },
    }).then((response) => {
      response.json().then((data) => {
        if (data.length === 0) {
          setApiResponse(null);
          setNoInfoFound(true);
          setLoading(false);
          return;
        }
        setApiResponse(data[0]);
      });
    });
  };

  const fetchCatsIfPossible = async (name: string) => {
    fetch(catAPI + formatBreed(name), {
      headers: {
        'X-Api-Key': API_KEY,
      },
    }).then((response) => {
      response.json().then((data) => {
        if (data.length === 0) {
          setApiResponse(null);
          setNoInfoFound(true);
          setLoading(false);
          return;
        }
        setApiResponse(data[0]);
      });
    });
  };

  const fallback = useCallback(() => {
    console.info('Fallback');
    setLoading(false);
    setApiResponse(null);
    setNoInfoFound(true);
  }, []);

  const reset = () => {
    dispatch(setResults([]));
    setApiResponse(null);
    setBreed(null);
    setLoading(false);
    setNoInfoFound(false);
    dispatch(setImageURL(undefined));
    dispatch(setAppState('modelReady'));
  };

  const upload = () => {
    inputRef.current?.click();
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      setInputFile(file);
      const url = URL.createObjectURL(file);
      dispatch(setImageURL(url));
      dispatch(setAppState('imageReady'));
    }
  };

  useEffect(() => {
    loadModel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type ActionButton = {
    [key: string]: {
      action?: () => void;
      text: string;
    };
  };

  const actionButton: ActionButton = {
    initial: { action: loadModel, text: 'Load Model' },
    loadingModel: { text: 'Loading Model...' },
    modelReady: { action: upload, text: 'Upload Image' },
    imageReady: { action: identify, text: 'Identify Breed' },
    identifying: { text: 'Identifying...' },
    complete: { action: reset, text: 'Try another animal' },
  };

  useEffect(() => {
    if (apiResponse) {
      const {
        image_link,
        name,
        max_height_female,
        max_height_male,
        max_life_expectancy,
        max_weight_female,
        max_weight_male,
        min_height_female,
        min_height_male,
        min_life_expectancy,
        min_weight_female,
        min_weight_male,
        ...rest
      } = apiResponse;

      const ratings = Object.keys(rest).map((key) => {
        return {
          name: key,
          value: rest[key],
        };
      });

      setBreed({
        image_link,
        name,
        max_height_female,
        max_height_male,
        max_life_expectancy,
        max_weight_female,
        max_weight_male,
        min_height_female,
        min_height_male,
        min_life_expectancy,
        min_weight_female,
        min_weight_male,
        ratings,
      });

      setLoading(false);
    }
  }, [apiResponse]);

  const formatName = (name: string) => {
    const words = name.split('_');
    const formattedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return formattedWords.join(' ');
  };

  return (
    <Container maxWidth="xl">
      {appState === 'loadingModel' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />

          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            {loadingNote}
          </Typography>
        </Box>
      )}
      {appState !== 'loadingModel' && (
        <>
          <Grid container justifyContent="center" spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                padding: 2,
              }}
            >
              {imageURL ? (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'grey.300',
                    borderRadius: 5,
                  }}
                >
                  <img
                    src={imageURL}
                    alt="upload-preview"
                    ref={imageRef}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'grey.300',
                    cursor: 'pointer',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: 5,
                  }}
                  onClick={upload}
                  {...getRootProps()}
                >
                  <Typography
                    variant="h6"
                    align="center"
                    sx={{
                      userSelect: 'none',
                    }}
                    onClick={upload}
                  >
                    Upload Image
                  </Typography>

                  <Image />

                  <input
                    type="file"
                    hidden
                    onChange={handleUpload}
                    ref={inputRef}
                  />
                </Box>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                padding: 2,
              }}
            >
              {results.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    width: '100%',
                    padding: 2,
                    backgroundColor: 'grey.300',
                    borderRadius: 5,
                  }}
                >
                  <Typography variant="h5" align="center">
                    {results[0].className}
                  </Typography>
                  <Typography variant="h6" align="center">
                    {`${(results[0].probability * 100).toFixed(2)}%`}
                  </Typography>
                </Box>
              )}

              {imageURL !== undefined && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={actionButton[appState].action}
                >
                  {actionButton[appState].text}
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {breed?.ratings?.map((rating: { value: number; name: string }) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={rating.value}>
                  <Card
                    sx={{
                      padding: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      align="center"
                      sx={{
                        marginRight: 2,
                      }}
                    >
                      {formatName(rating.name)}
                    </Typography>
                    <Slider
                      value={rating.value}
                      aria-label="Rating"
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={5}
                      draggable={false}
                    />
                  </Card>
                </Grid>
              );
            })}

            {loading && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <CircularProgress />

                  <Typography variant="h6" sx={{ marginLeft: 2 }}>
                    {loadingNote}
                  </Typography>
                </Box>
              </Grid>
            )}

            {noInfoFound && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography variant="h6" sx={{ marginLeft: 2 }}>
                    No information found for {breed ? breed : 'this'}, our info
                    is really limited, sorry!
                  </Typography>

                  {breed && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginLeft: 2 }}
                      onClick={() => {
                        window.open(
                          `https://www.google.com/search?q=${breed}`,
                          '_blank',
                        );
                      }}
                    >
                      Search on Google
                    </Button>
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Container>
  );
}

export default App;
