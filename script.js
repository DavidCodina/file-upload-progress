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


  xhr.upload.onloadend = function(e){
    messageContainer.textContent = 'Upload completed!'; //Occurs very quickly before onload message below.
    setTimeout(function(){                              //Let the progress bar be seen in it's finished state for a second.
      progress.classList.remove('visible');
      progressBar.style.width = '';
    }, 1000);
  };


  /* ===========================

  =========================== */


  xhr.onload = function(){
    fileForm.reset();
    submitButton.disabled = false;
    setTimeout(function(){ messageContainer.textContent = xhr.responseText; }, 1000);
    setTimeout(function(){ messageContainer.textContent = ''; }, 3000);
  };


  xhr.onerror = function(){
    fileForm.reset();
    submitButton.disabled = false; //Enable submit button.
    console.log("There was an error.");
  };


  xhr.open('POST', 'script.php', true);
  xhr.send(formData);
});
