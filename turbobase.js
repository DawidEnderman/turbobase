(function(Scratch) {
    'use strict';

    class TurbobaseExtension {
        constructor() {
            this.apiUrl = ''; 
            this.apiKey = ''; 
        }

        getInfo() {
            return {
                id: 'turbobase',
                name: 'Turbobase',
                color1: '#FF5722', 
                color2: '#FF5722', 
                color3: '#FF5722', 
                blocks: [
                    {
                        opcode: 'setApiUrl',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set Firebase URL to [URL]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'setApiKey',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set Firebase API Key to [API_KEY]',
                        arguments: {
                            API_KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'fetchData',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'fetch data from [PATH]',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'writeData',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'write [VALUE] to [PATH]',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'deleteData',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete data from [PATH]',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'registerUser',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'register user with email [EMAIL] and password [PASSWORD]',
                        arguments: {
                            EMAIL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'loginUser',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'login user with email [EMAIL] and password [PASSWORD]',
                        arguments: {
                            EMAIL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'sendPasswordResetEmail',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'send password reset email to [EMAIL]',
                        arguments: {
                            EMAIL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    }
                ],
                iconURL: 'https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png'
            };
        }

        setApiUrl(args) {
            this.apiUrl = args.URL;
        }

        setApiKey(args) {
            this.apiKey = args.API_KEY;
        }

        fetchData(args) {
            const path = args.PATH;
            const url = `${this.apiUrl}/${path}.json`;

            console.log('Fetching data from URL:', url);

            return fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    if (typeof data === 'object' && !Array.isArray(data)) {
                        return Object.values(data)[0];
                    }
                    return data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    return 'Error';
                });
        }

        writeData(args) {
            const path = args.PATH;
            const value = args.VALUE;
            const url = `${this.apiUrl}/${path}.json`;

            console.log('Writing data to URL:', url);

            return fetch(url, {
                method: 'PUT',
                body: JSON.stringify(value),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return 'Success';
            })
            .catch(error => {
                console.error('Error writing data:', error);
                return 'Error';
            });
        }

        deleteData(args) {
            const path = args.PATH;
            const url = `${this.apiUrl}/${path}.json`;

            console.log('Deleting data from URL:', url);

            return fetch(url, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return 'Success';
            })
            .catch(error => {
                console.error('Error deleting data:', error);
                return 'Error';
            });
        }

        registerUser(args) {
            const email = args.EMAIL;
            const password = args.PASSWORD;
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;

            console.log('Registering user at URL:', url);

            return fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => JSON.stringify(data))
            .catch(error => {
                console.error('Error registering user:', error);
                return 'Error';
            });
        }

        loginUser(args) {
            const email = args.EMAIL;
            const password = args.PASSWORD;
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

            console.log('Logging in user at URL:', url);

            return fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.idToken) {
                    return 'true';
                } else {
                    return 'false';
                }
            })
            .catch(error => {
                console.error('Error logging in user:', error);
                return 'false';
            });
        }

        sendPasswordResetEmail(args) {
            const email = args.EMAIL;
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.apiKey}`;

            console.log('Sending password reset email to:', email);

            return fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'PASSWORD_RESET',
                    email: email
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => JSON.stringify(data))
            .catch(error => {
                console.error('Error sending password reset email:', error);
                return 'Error';
            });
        }
    }

    Scratch.extensions.register(new TurbobaseExtension());
})(Scratch);
