import React from 'react';
import {
  Grid,
  Card,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import { Image } from '@mui/icons-material';
import { AppState, Result } from 'state';
import { DropzoneRootProps } from 'react-dropzone';

type ActionButton = {
  [key: string]: {
    action?: () => void;
    text: string;
  };
};

export const TopGrid = ({
  appState,
  getRootProps,
  handleIdentify,
  handleUpload,
  imageRef,
  imageURL,
  inputRef,
  loadModel,
  loading,
  results,
  upload,
  reset,
}: {
  appState: AppState;
  getRootProps: () => DropzoneRootProps;
  handleIdentify: () => void;
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageRef: React.RefObject<HTMLImageElement>;
  imageURL: string | undefined;
  inputRef: React.RefObject<HTMLInputElement>;
  loadModel: () => void;
  loading: boolean;
  results: Result[];
  upload: () => void;
  reset: () => void;
}) => {
  const actionButton: ActionButton = {
    initial: { action: loadModel, text: 'Load Model' },
    loadingModel: { text: 'Loading Model...' },
    modelReady: { action: upload, text: 'Upload Image' },
    imageReady: { action: handleIdentify, text: 'Identify Breed' },
    identifying: { text: 'Identifying...' },
    complete: { action: reset, text: 'Try another animal' },
  };
  return (
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
        }}
      >
        {imageURL ? (
          <Card
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: 5,
              padding: 2,
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
          </Card>
        ) : (
          <Card
            sx={{
              width: '100%',
              height: '100%',
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
                marginRight: 1,
              }}
              onClick={upload}
            >
              Upload Image
            </Typography>

            <Image />

            <input type="file" hidden onChange={handleUpload} ref={inputRef} />
          </Card>
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
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            height: '100%',
            minWidth: '100%',
          }}
          spacing={2}
        >
          {results.length > 0 && (
            <Grid item xs={12}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100%',
                  width: '100%',
                  padding: 2,
                  borderRadius: 5,
                }}
              >
                <Typography variant="h5" align="center">
                  {results[0].className}
                </Typography>
                <Typography variant="h6" align="center">
                  {`${(results[0].probability * 100).toFixed(2)}%`}
                </Typography>
              </Card>
            </Grid>
          )}

          {imageURL !== undefined && (
            <Grid item xs={12}>
              <Card
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={actionButton[appState].action}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {actionButton[appState].text}
                </Button>
              </Card>
            </Grid>
          )}

          {!imageURL && (
            <>
              <Grid
                item
                xs={12}
                sx={{
                  height: '50%',
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 2,
                    height: '100%',
                  }}
                >
                  <Typography variant="h6" align="center">
                    Upload an image to get started
                  </Typography>
                </Card>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  height: '50%',
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: 2,
                    height: '100%',
                  }}
                >
                  <Typography variant="h6" align="center">
                    This model can identify 130 different dog breeds
                  </Typography>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
