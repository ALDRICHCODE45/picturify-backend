export const FirstEmail = (link: string): string => {
  return `
    <!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
            text-align: center;
        }
        p {
            color: #666666;
            text-align: center;
            font-size: 20px;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #007bff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
        }
        .button > p {
            color: #ffffff;
            font-size: 20px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            margin: 20px 0;
        }
        .grid img {
            width: 50%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            margin-right: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Bienvenido a Picturify!</h1>
        <p>Disfruta de los increíbles servicios que la plataforma ofrece para crear y editar imágenes con inteligencia artificial</p>
        <div class="grid">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 1">
<img src="https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 2">
        </div>
        <a class="button" href="${link}"><p>Inicia ya!</p></a>
    </div>
</body>
</html>
    `;
};
