import {
  selectResults,
  setImageURL,
  setModelState,
  setModel,
  setResults,
} from 'state';
import { useSelector, useDispatch } from 'react-redux';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { ChangeEvent, useEffect, useState } from 'react';
import { checkForAnimal } from 'utils';
import { useAIDescription } from './useAIDescription';

type apiResponse = {
  [key: string]: string;
};

export const useModel = () => {
  const { getDescription } = useAIDescription();
  const dispatch = useDispatch();
  const { results, imageURL, model, appState } = useSelector(selectResults);
  const [loadingNote, setLoadingNote] = useState<string | null>(null);
  const [breed, setBreed] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [noInfoFound, setNoInfoFound] = useState(false);
  const [apiResponse, setApiResponse] = useState<
    apiResponse | null | undefined
  >(null);
  const [, setInputFile] = useState<File | undefined>(undefined);

  const loadModel = async () => {
    dispatch(setModelState('loadingModel'));
    setLoadingNote('Loading MobileNet model...');
    const loadedModel = await mobilenet.load({
      version: 2,
      alpha: 1.0,
    });
    setLoadingNote('Saving model...');
    dispatch(setModel(loadedModel));

    setLoadingNote('Finishing up...');
    await setTimeout(() => {
      reset();
    }, 500);
  };

  const identify = async (
    imageRef: React.MutableRefObject<HTMLImageElement | null>,
  ) => {
    if (!imageRef) {
      return;
    }

    setLoading(true);
    setLoadingNote(null);
    dispatch(setModelState('identifying'));
    const classificationResults = await model?.classify(
      imageRef.current as HTMLImageElement,
    );

    dispatch(setResults(classificationResults || []));
    dispatch(setModelState('complete'));

    const returnedBreed = classificationResults?.[0].className;

    const _breed = checkForAnimal(returnedBreed);

    if (_breed) {
      setBreed(returnedBreed);
      setNoInfoFound(false);
      switch (_breed) {
        case 'dog':
          setLoadingNote('Fetching dog...');
          return returnedBreed;
        case 'cat':
          setLoadingNote('This is a cat, we do not have info on cats yet.');
          setBreed({
            name: returnedBreed,
          });
          setNoInfoFound(true);
          setLoading(false);
          return 'cat';
        default:
          setLoading(false);
          setNoInfoFound(true);
          setBreed({
            name: returnedBreed,
          });
          return false;
      }
    } else {
      setNoInfoFound(true);
      setLoading(false);
      return false;
    }
  };

  const reset = () => {
    dispatch(setResults([]));
    setApiResponse(null);
    setBreed(null);
    setLoading(false);
    setNoInfoFound(false);
    dispatch(setImageURL(undefined));
    dispatch(setModelState('modelReady'));
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      setInputFile(file);
      const url = URL.createObjectURL(file);
      dispatch(setImageURL(url));
      dispatch(setModelState('imageReady'));
    }
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

      getDescription(name)
        .then((description) => {
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
            description,
          });

          setLoading(false);
        })
        .catch((error) => {
          console.info(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponse]);

  return {
    apiResponse,
    appState,
    breed,
    identify,
    imageURL,
    loadModel,
    loading,
    loadingNote,
    model,
    noInfoFound,
    reset,
    results,
    setApiResponse,
    setBreed,
    setLoading,
    setLoadingNote,
    setNoInfoFound,
    setInputFile,
    handleUpload,
  };
};
