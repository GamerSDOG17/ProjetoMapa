<?php

  header('Content-type: application/json');

  try{
  $pdo = new PDO('mysql:host=localhost; dbname=projetoMapa;', 'root', '');
  } catch (PDOException $erro) {
    echo "Erro: ".$erro->getMessage();
  }

  try{
  $sql = "DELETE FROM mapa WHERE id =  :id";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':id', $_POST['id'], PDO::PARAM_INT);   
  $stmt->execute();

  if($stmt->rowCount() >= 1){
    echo json_encode('Marcador excluído com sucesso!');
  }else{
    echo json_encode('Falha ao enviar dados!!!');
  }
}catch (PDOException $erro) {
  echo "Erro: ".$erro->getMessage();
}
?>