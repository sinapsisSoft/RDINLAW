<?php
    $server="localhost";
    $user="root";
    $passwrod="";
    $dataBase="calendar";

    try{
        $db=new PDO("mysql:host=".$server.";dbname=".$dataBase.";charset=utf8",$user,$passwrod);
        
    }
    catch(PDOException $e){
       die("Error :". $e->getMessage()); 
    }
?>