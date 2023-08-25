import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import './Recording.css';

const Recording = () => {
  const [recordedVideoUrl, setRecordedVideoUrl] = useState('');
  const [recordingStatus, setRecordingStatus] = useState('');
  const [selectedOption, setSelectedOption] = useState('video');
  const [val, setVal] = useState('video');


  const handleRecordingStart = () => {
    setRecordingStatus('Recording...');
  };

  const handleRecordingStop = (blobUrl) => {
    setRecordingStatus('Recording stopped');
    setRecordedVideoUrl(blobUrl);
  };

  const handleDeleteVideo = () => {
    setRecordedVideoUrl('');
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setVal(event.target.value);
  };

  return (
    <div className="recording-container">
      {/* <div className="options-container">
        <div className="custom-select-container">
          <span className="select-icon">&#9660;</span>
          <select className="custom-select" value={selectedOption} onChange={handleOptionChange}>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            <option value="screen">Screen Sharing</option>
          </select>
        </div>
      </div> */}
      <div className="camera-container">
        <div className="options-container">
          <h3>what you want to record ?</h3>
          <div className="custom-select-container">
            <span className="select-icon">&#9660;</span>
            <select className="custom-select" value={selectedOption} onChange={handleOptionChange}>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="screen">Screen Sharing</option>
            </select>
          </div>
        </div>
        <ReactMediaRecorder
          audio={selectedOption === 'audio'}
          video={selectedOption === 'video'}
          screen={selectedOption === 'screen'}
          render={({ status, startRecording, stopRecording, previewStream }) => (
            <div className="camera">
              {previewStream && <video srcObject={previewStream} autoPlay muted />}
              <div className="button-container">
                {status !== 'recording' && (
                  <button className="start-button" onClick={startRecording}>Start</button>
                )}
                {status === 'recording' && (
                  <div>
                    {handleRecordingStart()}
                    <button className="stop-button" onClick={stopRecording}>Stop</button>
                  </div>
                )}
              </div>
              <p className="recording-status">{recordingStatus}</p>
            </div>
          )}
          onStop={handleRecordingStop}
        />
      </div>
      <div className="video-container">
        {recordedVideoUrl && (
          <div className="recorded-video-container">
            <video className="recorded-video" src={recordedVideoUrl} controls autoPlay loop />
            <button className="delete-button" onClick={handleDeleteVideo}>Delete {val}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recording;
