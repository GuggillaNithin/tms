<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.html");
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$subject = trim($_POST["subject"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "" || $email === "" || $subject === "" || $message === "") {
    header("Location: contact.html?status=missing");
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: contact.html?status=invalid-email");
    exit;
}

$to = "nithin@lxdguild";
$mailSubject = "Contact Form: " . preg_replace("/[\r\n]+/", " ", $subject);

$mailBody = "New contact form submission:\n\n";
$mailBody .= "Name: " . $name . "\n";
$mailBody .= "Email: " . $email . "\n";
$mailBody .= "Subject: " . $subject . "\n\n";
$mailBody .= "Message:\n" . $message . "\n";

$headers = "From: noreply@tmsdubai.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$isSent = mail($to, $mailSubject, $mailBody, $headers);

if ($isSent) {
    header("Location: contact.html?status=sent");
    exit;
}

header("Location: contact.html?status=error");
exit;
?>
