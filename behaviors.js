if ("serviceWorker" in navigator) {
    console.info("[page] Your browser supports Service Workers");
  
    // -----------------------------------------------------------
    // Register Service Worker
    // -----------------------------------------------------------
  
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./serviceworker.js", { scope: "./" })
        .then(registration => {
          console.info(
            "[page] Enregistrement du service worker ok avec le scope : ",
            registration.scope
          );
        })
        .catch(err => {
          console.error("[page] ServiceWorker registration failed, planté !!! : ", err);
        });
    });
  
    // -----------------------------------------------------------
    // PWA installation
    // -----------------------------------------------------------
  
    let installPromptEvent;
    window.addEventListener("beforeinstallprompt", event => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      installPromptEvent = event;
      // Update the install UI to notify the user app can be installed
      document.querySelector("#installation button").disabled = false;
      console.info("[page] PWA installation can be done");
    });
  
    document
      .querySelector("#installation button")
      .addEventListener("click", () => {
        // Update the install UI to disable the install button
        document.querySelector("#installation button").disabled = true;
        // Show the modal add to home screen dialog
        installPromptEvent.prompt();
        // Wait for the user to respond to the prompt
        installPromptEvent.userChoice.then(choice => {
          if (choice.outcome === "accepted") {
            console.info("[page] The user accepted the A2HS prompt");
          } else {
            console.error("[page] The user dismissed the A2HS prompt");
          }
          // Clear the saved prompt since it can't be used again
          installPromptEvent = null;
        });
      });
  
    window.addEventListener("appinstalled", event => {
      console.info("[page] The PWA has been installed");
    });
  } else {
    console.error("[page] Your browser doesn't support Service Workers");
  }
  
  
  /*             if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                  navigator.serviceWorker.register('serviceworker.js')
                  .then(registration => {
                      console.log('Registration successful with scope: ', registration.scope)
                  }).catch(err => {
                      console.log('Registration failed: ', err)
                  })
              })
          }       */