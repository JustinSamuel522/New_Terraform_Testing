<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $code = $_POST['code'];
    
    // Sanitize the code to prevent file system manipulation
    $code = preg_replace('/[^A-Za-z0-9_\-]/', '', $code);
    $filePath = 'path/to/your/html/files/' . $code . '.html';
    
    $htmlContent = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Photos for ' . htmlspecialchars($code) . '</title>
    </head>
    <body>
        <h1>Photos for ' . htmlspecialchars($code) . '</h1>
        <!-- Add photo upload or display functionality here -->
    </body>
    </html>
    ';
    
    if (file_put_contents($filePath, $htmlContent)) {
        echo json_encode(['message' => 'HTML file created successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to create HTML file']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>