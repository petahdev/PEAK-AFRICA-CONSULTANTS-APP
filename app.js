let deferredPrompt = null;

// Check if the app is installed (standalone mode)
const isAppInstalled = window.matchMedia("(display-mode: standalone)").matches;

// Listen for the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  console.log("beforeinstallprompt event fired"); // Debugging log

  // Prevent the default mini-infobar prompt
  event.preventDefault();
  deferredPrompt = event;

  // Show the modal if the app is not installed (not in standalone mode)
  if (!isAppInstalled) {
    showInstallModal();
  }
});

// Function to show the modal
function showInstallModal() {
  const installModal = document.getElementById("install-modal");
  installModal.classList.remove("hidden");
}

// Function to hide the modal
function hideInstallModal() {
  const installModal = document.getElementById("install-modal");
  installModal.classList.add("hidden");
}

// Handle the "Install" button click
document.getElementById("install-button").addEventListener("click", () => {
  hideInstallModal();

  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("PWA installation accepted");
      } else {
        console.log("PWA installation dismissed");
      }
      deferredPrompt = null;
    });
  }
});

// Handle the "Not Now" button click
document.getElementById("dismiss-button").addEventListener("click", () => {
  hideInstallModal();
  console.log("Install prompt dismissed.");
});

// Log when the app is already installed (standalone mode)
if (isAppInstalled) {
  console.log("App is already installed (standalone mode).");
} else {
  console.log("App is running in the browser (not installed).");
}
