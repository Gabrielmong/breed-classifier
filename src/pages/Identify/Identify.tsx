import { Container } from '@mui/material';
import { DOG_API_URL, API_KEY } from 'data';
import { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux';
import { selectResults, setImageURL, setModelState } from 'state';
import { LoadingScreen, TopGrid } from 'components';
import { BreedInfoSection } from 'components/BreedInfoSection/BreedInfoSection';
import { useModel } from 'hooks';
import { formatBreed } from 'utils';

export const Identify = () => {
  const {
    breed,
    identify,
    imageURL,
    loadModel,
    loading,
    loadingNote,
    noInfoFound,
    reset,
    results,
    setApiResponse,
    setLoading,
    setNoInfoFound,
    handleUpload,
  } = useModel();
  const { appState } = useSelector(selectResults);
  const [, setInputFile] = useState<File | undefined>(undefined);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setInputFile(acceptedFiles[0]);
      const url = URL.createObjectURL(acceptedFiles[0]);
      dispatch(setImageURL(url));
      dispatch(setModelState('imageReady'));
    },
  });

  const dispatch = useDispatch();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fetchDogsIfPossible = async (name: string) => {
    fetch(DOG_API_URL + formatBreed(name), {
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

  const upload = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    loadModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIdentify = async () => {
    setLoading(true);
    const _breed = await identify(imageRef);

    if (!_breed) {
      return;
    }

    fetchDogsIfPossible(_breed);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        marginY: 10,
      }}
    >
      {appState === 'loadingModel' && (
        <LoadingScreen loadingNote={loadingNote} />
      )}
      {appState !== 'loadingModel' && (
        <>
          <TopGrid
            imageURL={imageURL}
            imageRef={imageRef}
            upload={upload}
            appState={appState}
            getRootProps={getRootProps}
            handleUpload={handleUpload}
            inputRef={inputRef}
            results={results}
            loading={loading}
            handleIdentify={handleIdentify}
            loadModel={loadModel}
            reset={reset}
          />

          {breed && (
            <BreedInfoSection
              breed={breed}
              loading={loading}
              loadingNote={loadingNote}
              noInfoFound={noInfoFound}
            />
          )}
        </>
      )}
    </Container>
  );
};
