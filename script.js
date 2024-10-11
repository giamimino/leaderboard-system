fetch('./users.json')
    .then((response) => response.json())
    .then((json) => {
        // Extract the users array
        const users = json['users'];
        
        // Create arrays for scores, profiles, and real names
        const scores = users.map(user => user.score);
        const profiles = users.map(user => user.profile);  // Renamed to profiles (plural) to avoid conflict
        const realNames = users.map(user => user.user);    // Renamed to realNames (plural)

        // Sort the array in descending order (and return both the score and its original index)
        const sortedUsers = scores
            .map((score, index) => ({ score, index }))  // Keep track of the original index
            .sort((a, b) => b.score - a.score);         // Sort by score in descending order

        sortedUsers.forEach((user, rank) => {
            const container = document.getElementById("container");

            // Create a wrapper for each user
            const wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");
            container.appendChild(wrapper);

            // Create the place element (ranking)
            const place = document.createElement("div");
            place.classList.add("place");
            place.textContent = "#" + (rank + 1); // Correct the rank number
            wrapper.appendChild(place);

            // Create the profile element (user image)
            const profileDiv = document.createElement("div");
            profileDiv.classList.add("profile");
            profileDiv.style.backgroundImage = `url(${profiles[user.index]})`;  // Use the correct profile URL
            wrapper.appendChild(profileDiv);

            // Create the name element (user's real name)
            const nameDiv = document.createElement("div");
            nameDiv.classList.add("name");
            nameDiv.textContent = realNames[user.index];  // Use the correct name
            wrapper.appendChild(nameDiv);

            // Create the score element
            const scoreDiv = document.createElement("div");
            scoreDiv.classList.add("score");
            scoreDiv.textContent = scores[user.index];
            wrapper.appendChild(scoreDiv);
        });
    })
    .catch((error) => {
        console.error('Error fetching the data:', error);
        const container = document.getElementById("container");
        const jsonError = document.createElement("div");
        jsonError.classList.add("error");
        jsonError.textContent = "404";
        container.appendChild(jsonError);
    });
