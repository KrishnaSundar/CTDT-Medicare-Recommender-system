<?php
    if (empty($_POST)===false){
$email = sanitize($_POST['username']);
$password = sanitize($_POST['password']);

if (empty($email) === true || empty ($password) === true){ 
            $result = false;
            $errors = 'You need to enter a username and password';
            echo json_encode(array("success"=>$result,
                                   "message"=>$errors,             
                                   ));
} else if (mail_exists($email) === false){
            $result = false;
            $errors= 'we can\'t find that username. have you registered?';
            echo json_encode(array("success"=>$result,
                                   "message"=>$errors,             
                             ));
}else if (user_active($email) === false){
            $result = false;
            $errors = 'you haven\'t activated your account!';
            echo json_encode(array("success"=>$result,
                            "message"=>$errors,             
                             ));
}else {
$login = login($email, $password);
if ($login === false){
            $result = false;
            $errors = 'username/password combination is incorrect!';
            echo json_encode(array("success"=>$result,
                            "message"=>$errors,             
                             ));
} else {
//set user session 
$_SESSION['user_id'] = $login;
$result = true;
    echo json_encode(array("success"=>$result
                               ));

}
}
}
?>