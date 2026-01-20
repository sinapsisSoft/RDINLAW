<?php
require_once('connectDB.php');
if(isset($_POST['event'][0]) && $_POST['event'][0]==1){
    $sql="UPDATE events SET start_event=?, end_event=? WHERE id=?";
}
else{
    $sql="UPDATE events SET start_event=?, end_event=? WHERE id=?";
}
   if(isset($_POST['event'][1]) && isset($_POST['event'][2]) && $_POST['event'][3]){
        $id=$_POST['event'][1];

        if(isset($_POST['event'][0]) && $_POST['event'][0]==1){
            $sql="UPDATE events SET title=?, color=? WHERE id=?";
            $data = [$_POST['event'][2],$_POST['event'][3],$id];
        }
        else{
            $sql="UPDATE events SET start_event=?, end_event=? WHERE id=?";
            $data = [$_POST['event'][2],$_POST['event'][3],$id];
        }

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