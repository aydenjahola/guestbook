# Fauna GraphQL Guestbook

## Overview
Welcome to the Fauna GraphQL Guestbook project. This is a simple guestbook application built using Next.js, FaunaDB, and GraphQL. It allows users to leave messages and view messages left by others.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following requirements:

- Node.js (Version 14 or higher)
- npm or Yarn

### Installation
1. Clone the repository to your local machine:

```shell
git clone https://github.com/yourusername/fauna-graphql-guestbook.git
```

2. Navigate to the project directory:

```shell
cd fauna-graphql-guestbook
```

3. Install project dependencies:

- If you're using npm:

    ```npm install```

- If you're using Yarn:

    ```yarn install```


### Usage
1. Set up FaunaDB:
    - Sign up for a [FaunaDB account](https://fauna.com/).
    - Create a new database in FaunaDB.
    - Create a new collection in your database named "messages."
    - Generate an API key with appropriate permissions.

2. Create a .env.local file in the project root directory and add your FaunaDB API key:

```shell
FAUNA_API_KEY=your_api_key_here
```

3. Start the development server:

- If you're using npm:
    ```shell
    npm run dev
    ```

- If you're using Yarn:
    ```shell
    yarn dev
    ```

4. Open your web browser and visit [localhost:300](http://localhost:3000) to access the guestbook application.

5. Use the application to leave and view messages!

## Contributing
Contributions are welcome! If you'd like to contribute to this project.

## License
This project is licensed under the AGPL License - see the LICENSE file for details.