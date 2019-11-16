
<?php
 $destino="juanchurro2017@gmail.com";
 $nombre=$_POST["name"];
 $correo=$_POST["email"];;
 $mensaje=$_POST["message"];
 $contenido="Nombre: ".$nombre."\nCorreo: ".$correo."\nMensaje: ".$mensaje;
 mail($destino,"Contacto", $contenido);
 
 
 header("Location: http://www.sistemasiesa.com.ar/aseguradora/principal.php?menu=formulario");

?>
