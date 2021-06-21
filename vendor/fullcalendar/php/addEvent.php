<?php
require_once('connectDB.php');

    if(isset($_POST['event'][1]) && isset($_POST['event'][2]) && isset($_POST['event'][3]) && isset($_POST['event'][4]) ){
        $title=$_POST['event'][3];
        $start=$_POST['event'][1];
        $end=$_POST['event'][2];
        $color=$_POST['event'][4];
        $sql="INSERT INTO events(title, color, start_event, end_event) VALUES ('$title','$color','$start','$end')";
        //echo $sql;
        $query=$db->prepare($sql);
        if($query==false){
            print_r($db->errorInfo());
            die('Error');
        }
        $sth=$query->execute();
        if($sth==false){
            print_r($db->errorInfo());
            die('Error');
        }
        else{
            die('ok');
        }
    }
//header('Location:'.$_SERVER['HTTP_REFERER']);
?>