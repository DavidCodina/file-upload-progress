const fileForm         = document.getElementById('file-form');
const fileInput        = document.getElementById('file-input');
const submitButton     = document.getElementById('submit-button');
const progress         = document.querySelector('#progress');
const progressBar      = document.querySelector('#progress > .progress-bar');
const messageContainer = document.getElementById('message-container');


/* =============================================================================

============================================================================= */


fileForm.addEventListener('submit', function(e){
  e.preventDefault();
  submitButton.disabled = true;

  const xhr      = new XMLHttpRequest();
  const formData = new FormData();
  const file     = fileInput.files[0];

  if (!file){
    submitButton.disabled = false;
    return alert("You must select a file first.");
  }


  formData.append('file', file);


  /* ===========================

  =========================== */


  xhr.upload.onloadstart = function(e){
    const completed = Math.round((e.loaded / e.total) * 100);
    progress.classList.add('visible');
    progressBar.style.width = completed + '%';
    messageContainer.textContent  = 'Uploading...';
  };


  xhr.upload.onprogress = function(e){
    const completed = Math.round((e.loaded / e.total) * 100);
    progressBar.style.width = completed + '%';
  };


  // xhr.upload.onloadend = function(e){
  //   setTimeout(function(){                                 //Demo only
  //     messageContainer.textContent = 'Upload completed!'; //Occurs very quickly before onload message below.
  //     progress.classList.remove('visible');
  //     progressBar.style.width = '';
  //   }, 1000);
  // };


  /* ===========================

  =========================== */


  xhr.onload = function(){
    setTimeout(function(){ //Demo only
      fileForm.reset();
      submitButton.disabled        = false;
      messageContainer.textContent = xhr.responseText;
      progress.classList.remove('visible');
      progressBar.style.width = '';
    }, 1000);
    setTimeout(function(){ messageContainer.textContent = ''; }, 2000);
  };


  xhr.onerror = function(){
    fileForm.reset();
    submitButton.disabled        = false; //Enable submit button.
    messageContainer.textContent = "There was an error";
    progress.classList.remove('visible');
    progressBar.style.width = '';
  };
  

  //xhr.open('POST', 'script.php', true); //Actual php script.
  xhr.open('POST', 'https://httpstat.us/201', true); //GitHub only
  xhr.send(formData);
});
