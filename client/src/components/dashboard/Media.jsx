import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import { array } from 'prop-types';

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      selectedFiles: null,
      username: 'TEST',
      images: []

    }
    // this.multipleFileChangedHandler = this.multipleFileChangedHandler.bind(this);
    // this.multipleFileUploadHandler = this.multipleFileUploadHandler.bind(this);
  }



  // multipleFileChangedHandler(event) {
  //   this.setState({
  //     selectedFiles: event.target.files
  //   });
  //   console.log(event.target.files);
  // };


  // multipleFileUploadHandler() {
  //   const data = new FormData();
  //   let selectedFiles = this.state.selectedFiles;// If file selected
  //   if (selectedFiles) {
  //     for (let i = 0; i < selectedFiles.length; i++) {
  //       data.append('galleryImage', selectedFiles[i], selectedFiles[i].name);
  //     }
  //     axios.post('/api/profile/multiple-file-upload', data, {
  //       headers: {
  //         'accept': 'application/json',
  //         'Accept-Language': 'en-US,en;q=0.8',
  //         'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  //       }
  //     })
  //       .then((response) => {
  //         console.log('res', response); if (200 === response.status) {
  //           // If file size is larger than expected.
  //           if (response.data.error) {
  //             if ('LIMIT_FILE_SIZE' === response.data.error.code) {
  //               this.ocShowAlert('Max size: 10MB', 'red');
  //             } else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
  //               this.ocShowAlert('Max 4 images allowed', 'red');
  //             } else {
  //               // If not the given ile type
  //               this.ocShowAlert(response.data.error, 'red');
  //             }
  //           } else {
  //             // Success
  //             let fileName = response.data;
  //             console.log('fileName', fileName);
  //             this.ocShowAlert('File Uploaded', '#3089cf');
  //           }
  //         }
  //       }).catch((error) => {
  //         // If another error
  //         this.ocShowAlert(error, 'red');
  //       });
  //   } else {
  //     // if file not selected throw error
  //     this.ocShowAlert('Please upload file', 'red');
  //   }
  // };




  render() {
    console.log("CURRENT STATE", this.props)
    let imageComponent;
    if (this.props.images) {
      imageComponent = this.props.images.map((image, index) => {
        if (image !== null) {
          return (
            <div key={index}>
              <img src={image} style={{ width: "400px", height: "400px", margin: "10px", boxShadow: '0 5px 10px 2px rgba(190,185,185,.5)' }} />
            </div>
          )
        }
      });
    }
    return (
      <div style={{ alignSelf: "center" }}>
        <div id="oc-alert-container"></div>{/* Single File Upload*/}
        <div className="mediaContainer">
          {/* For Alert box*/}
          <div className="card-header border-light imageUpload" style={{ boxShadow: '0 5px 10px 2px rgba(190,185,185,.5)', height: '55px' }}>
            <h3 style={{ color: '#555', marginLeft: '12px', fontSize: '20px', display: "inline-flex", alignItems: 'center' }}>Image Upload</h3>
            <p className="text-muted" style={{ marginLeft: '12px', display: "inline-flex", alignItems: 'center' }}>Max 2MB</p>
            <div className="imageButton">
              <input className="files" type="file" onChange={this.props.singleFileChangedHandler} />
              <button className="btn btn-info" onClick={this.props.singleFileUploadHandler}>Upload!</button>
            </div>
            <div className="card-body" style={{ height: '0px' }}></div>
          </div>
        </div>
        <div>
        </div>
        <div style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
          {imageComponent}
        </div>
      </div>
    );
  }
}


export default Media;
  // {/* Multiple File Upload */}
  //         {/* <div className="card border-light ml-4" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
  //           <div className="card-header">
  //             <h3 style={{ color: '#555', marginLeft: '12px' }}>Upload Muliple Images</h3>
  //             <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 400px x 400px ( Max 2MB )</p>
  //           </div>
  //           <div className="card-body">
  //             <p className="card-text">Please upload the Gallery Images for your gallery</p>
  //             <input className="files" type="file" multiple onChange={this.multipleFileChangedHandler} />
  //             <div className="mt-5">
  //               <button className="btn btn-info" onClick={this.multipleFileUploadHandler}>Upload!</button>
  //             </div>
  //           </div>
  //         </div> */}