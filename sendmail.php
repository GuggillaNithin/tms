<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $userEmail = $_POST['email'];

    $to = "akshaypradeep@outook.com";
    $subject = $userEmail . " interested in Products";

    $message = "A customer filled the Ramzan popup form.\n\n";
    $message .= "Email: " . $userEmail . "\n\n";
    $message .= "They are interested in TMS products.";

    $headers = "From: akshaypradeep@outook.com\r\n";
    $headers .= "Reply-To: " . $userEmail . "\r\n";

    mail($to, $subject, $message, $headers);

    echo "<script>
            alert('Thank you! We will contact you soon.');
            window.location.href='index.html';
          </script>";
}

?>
