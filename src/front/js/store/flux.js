const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: {
				"email": "",
				"password": "",
			},

		},
		actions: {
			handleOnchange: (event) => {
				const store = getStore();
				setStore({
					user: {
						...store.user,
						[event.target.name]: event.target.value
					}

				});
			
			
			},
			handleSubmituser: () => {
				const store = getStore()
				fetch("https://congenial-funicular-g44x4xpjpxvvf9wq-3001.app.github.dev/register", {
					method: "POST",
					body: JSON.stringify(store.user),
					headers: {
						"content-type": "application/json"
					}
				}).then((response) => response.json())
					.then((data) => console.log(data))
					.catch((error) => console.log(error))
			},
			handleSubmitLogin: () => {
				const store = getStore()
				if(!store.accessToken){
				fetch("https://congenial-funicular-g44x4xpjpxvvf9wq-3001.app.github.dev/login", {
					method: "POST",
					body: JSON.stringify(store.user),
					headers: {
						"content-type": "application/json"
					}
				}).then((response) => response.json())
					.then((data) => {setStore({ accessToken: data.access_token
						
					 }),console.log(data) })
					.catch((error) => console.log(error))
				}

			},
			getAutvalidation: () => {
				const store = getStore()
				if (store.accessToken && typeof store.accessToken==="string") {
					fetch("https://congenial-funicular-g44x4xpjpxvvf9wq-3001.app.github.dev/autvalidation", {
						method: "GET",
						headers: {
							"content-type": "application/json",
							'Authorization': 'Bearer '+store.accessToken,

						}
					}).then((response) => response.json())
					.then((data) => console.log(data))
					.catch((error) => console.log(error))
				}
				else{
					alert("falta accesstoken")
					console.log("sin access token")
				}

			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
