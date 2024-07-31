// Created by Dawid Enderman

(function(Scratch) {
    'use strict';

    class TurbobaseExtension {
        constructor() {
            this.apiUrl = ''; 
            this.apiKey = ''; 
        }

        getInfo() {
            return {
                id: 'dawidendermanturbobase',
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
                    },
                    {
                        opcode: 'getEmailUID',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get UID of user with email [EMAIL] and password [PASSWORD]',
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
                    }
                ],
				menuIconURI: 'data:image/png;base64,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'
            };
        }

        setApiUrl(args) {
            this.apiUrl = args.URL;
        }

        setApiKey(args) {
            this.apiKey = args.API_KEY;
            console.log('API Key set to:', this.apiKey);
        }

        fetchData(args) {
            const path = args.PATH;
            const url = `${this.apiUrl}/${path}.json`;

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

        getEmailUID(args) {
            const email = args.EMAIL;
            const password = args.PASSWORD;
            const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

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
                if (data.localId) {
                    return data.localId;
                } else {
                    console.error('Error: No user found');
                    return 'Error: No user found';
                }
            })
            .catch(error => {
                console.error('Error fetching UID:', error);
                return 'Error';
            });
        }
    }

    Scratch.extensions.register(new TurbobaseExtension());
})(Scratch);
