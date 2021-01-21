<?php
// ini_set('display_errors', '1');
// error_reporting(E_ALL);

if (isset($_FILES['file'])){
  echo $_FILES['file']['name'] . ' was received by the server.';
} else {
  echo 'There was a problem uploading the file.';
}
?>
