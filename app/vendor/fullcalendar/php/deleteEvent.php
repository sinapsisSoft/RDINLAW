<?php
require_once('connectDB.php');

    

   if(isset($_POST['event'][1])){
        $id=$_POST['event'][1];
        $sql="DELETE FROM events WHERE id=?";
        $data = [$id];
        $query=$db->prepare($sql);
        $sth=$query->execute($data);
   
        if($sth==false){
          
            print_r($db->errorInfo());
            die('Error');
        }else{
            die('ok');
        }
   }
//header('Location:'.$_SERVER['HTTP_REFERER']);
?>