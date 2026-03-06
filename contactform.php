<?php

declare(strict_types=1);

const ADMIN_EMAIL = "nithin@lxdguild.com";
const DEFAULT_SUBJECT = "Sample Request - Bio-Degradable PVC";

function sanitize_header_value(string $value): string
{
    return trim((string) preg_replace("/[\r\n]+/", " ", $value));
}

function sendAdminContactMail(string $name, string $email, string $subject, string $message, string $formSource): bool
{
    $safeName = sanitize_header_value($name);
    $safeEmail = sanitize_header_value($email);
    $safeSubject = sanitize_header_value($subject);
    $safeSource = sanitize_header_value($formSource);

    $mailSubject = "Website Enquiry: " . $safeSubject;
    $mailBody = "New website form submission\n\n";
    $mailBody .= "Source: " . $safeSource . "\n";
    $mailBody .= "Name: " . $safeName . "\n";
    $mailBody .= "Email: " . $safeEmail . "\n";
    $mailBody .= "Subject: " . $safeSubject . "\n\n";
    $mailBody .= "Message:\n" . ($message !== "" ? $message : "(No message provided)") . "\n";

    $headers = "From: noreply@tmsdubai.com\r\n";
    $headers .= "Reply-To: " . $safeEmail . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    return mail(ADMIN_EMAIL, $mailSubject, $mailBody, $headers);
}

function redirectWithStatus(string $status): void
{
    header("Location: bio-degradable-pvc.html?status=" . urlencode($status) . "#sample");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    redirectWithStatus("invalid-request");
}

$name = trim((string) ($_POST["name"] ?? ""));
$email = trim((string) ($_POST["email"] ?? ""));
$subject = trim((string) ($_POST["subject"] ?? DEFAULT_SUBJECT));
$message = trim((string) ($_POST["message"] ?? ""));
$formSource = trim((string) ($_POST["form_source"] ?? "website-contact-form"));

if ($name === "" || $email === "") {
    redirectWithStatus("missing");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirectWithStatus("invalid-email");
}

$isSent = sendAdminContactMail($name, $email, $subject, $message, $formSource);

if ($isSent) {
    redirectWithStatus("sent");
}

redirectWithStatus("error");
?>
